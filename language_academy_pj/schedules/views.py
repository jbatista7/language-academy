from operator import sub
from languageacademy.settings import ALLOWED_HOSTS
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Task, PurchasedPackage
from lessons.models import Pack
from profiles.models import Teacher, Student
import datetime
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .decorators import allowed_users

# from math import copysign

User = get_user_model()

one_day = datetime.timedelta(days=1)
two_days = datetime.timedelta(days=2)

# Create your views here.

@login_required
@allowed_users(allowed_roles=['teacher'])
def teacher_task_data_view(request):
    user_id = request.user.id
    task_qs = Task.objects.filter(teacher__user_id=user_id)
    data = []
    for task in task_qs:
        item = {
            'id': task.id,
            'pack': task.pack.name,
            'language': task.pack.language,
            'lesson': task.lesson.title,
            'teacher': task.teacher.user.full_name(),
            'duration': task.lesson.duration,
            'date': task.date.strftime('%d/%m/%y %H:%M'),
            'status': task.status,
        }
        data.append(item)
    return JsonResponse({'data': data})

@login_required
@allowed_users(allowed_roles=['student'])
def task_data_view(request): #students task data view
    user_id = request.user.id
    task_qs = Task.objects.filter(student__user_id=user_id)    
    data = []
    for task in task_qs:
        item = {
            'id': task.id,
            'pack': task.pack.name,
            'language': task.pack.language,
            'lesson': task.lesson.title,
            'teacher': task.teacher.user.full_name(),
            'duration': task.lesson.duration,
            'date': task.date.strftime('%d/%m/%y %H:%M'),
            'status': task.status,
        }
        data.append(item)
    return JsonResponse({'data':data})

@login_required
@allowed_users(allowed_roles=['student'])
def get_task_view(request, *args, **kwargs):
    task_id = kwargs.get('task')
    user_id = request.user.id
    task_qs = Task.objects.filter(student__user_id=user_id, id=task_id)
    data = []
    for task in task_qs:
        item = {
            'id': task.id,
            'language': str(task.teacher.category),
            'lesson_link': task.lesson_link,
            'teacher': task.teacher.user.full_name(),
            'date': task.date.strftime('%d/%m/%y %H:%M'),
            'status': task.status,
        }
        data.append(item)
    return JsonResponse({'data': data})

@login_required
@allowed_users(allowed_roles=['student', 'teacher'])
def task_view(request, *args, **kwargs):
    role = request.user.get_role()
    user_id = request.user.id
    if role == 'student':
        active_task_count = 0
        for obj in Task.objects.filter(student__user_id=user_id):
            status = obj.status
            if status == 'active':
                today = timezone.now()
                old_date = obj.date
                time_diference = (old_date - today)
                if time_diference < -one_day: #delete the booking after one day without taking the class
                    obj.delete()
        
        # get balance for reminder 
        purchased_packs = PurchasedPackage.objects.filter(student__user_id=request.user.id)
        task_amount = Task.objects.filter(student__user_id=request.user.id).count()
        balance = 0
        for p in purchased_packs:
            balance += p.pack.number_of_lessons

        if balance < task_amount:
            balance = 0
        else:
            balance -= task_amount
         # end get balance for reminder
        
        task_qs = Task.objects.filter(student__user_id=user_id)
        purchased_packs = PurchasedPackage.objects.filter(student__user_id=user_id)  
        context = {
            'task_qs': task_qs, 
            'pack_qs': purchased_packs,
            'balance': balance,
        }
        return render(request, 'schedules/student-task.html', context)
    elif role == 'teacher':
        for obj in Task.objects.filter(teacher__user_id=user_id):
            status = obj.status
            if status == 'active':
                today = timezone.now()
                old_date = obj.date
                time_diference = (old_date - today)
                if time_diference < -one_day: #delete the booking after one day without taking the class
                    obj.delete()
        task_qs = Task.objects.filter(teacher__user_id=user_id)

        context = {
            'task_qs': task_qs, 
        }
        return render(request, 'schedules/teacher-task.html', context)
    return render(request, 'schedules/student-task.html')

@login_required
@allowed_users(allowed_roles=['student'])
def get_json_pack_data(request):
    user_id = request.user.id
    purchased_packs = PurchasedPackage.objects.filter(student__user_id=user_id)
    data = []
    for p in purchased_packs:
        item = {
            'id': p.pack.id,
            'language': str(p.pack.language),
            'number_of_lessons': p.pack.number_of_lessons,
        }
        data.append(item)
    return JsonResponse({'data': data})

@login_required
@allowed_users(allowed_roles=['student'])
def get_json_lessons_data(request, *args, **kwargs):
    selected_pack = kwargs.get('pack')
    obj_pack = Pack.objects.filter(name=selected_pack)
    obj_lessons = []
    for obj in obj_pack:
        obj_lessons = list(obj.lessons.all().values())
    return JsonResponse({'data':obj_lessons})

@login_required
@allowed_users(allowed_roles=['student'])
def get_json_teachers_data(request, *args, **kwargs):
    teacher_category = str(kwargs.get('category'))
    teachers = Teacher.objects.filter(category__name__iexact=teacher_category)    
    obj_teachers = []
    for person in teachers:
        obj_teachers.append({
            "user_id": person.user.id,
            "name": person.full_name(),
            "week_days":
                {
                    "sunday": person.sunday,
                    "monday": person.monday,
                    "tuesday": person.tuesday,
                    "wednesday": person.wednesday,
                    "thursday": person.thursday,
                    "friday": person.friday,
                    "saturday": person.saturday,
                }
            ,
            })
    return JsonResponse({'data':obj_teachers})

@login_required
@allowed_users(allowed_roles=['student'])
def update_task(request, pk):
    obj = Task.objects.get(pk=pk)
    if request.is_ajax():
        status = request.POST.get('status')
        if status == 'active':
            user_id = request.POST.get('user_id')
            new_student = Student.objects.get(user_id=user_id)
            teacher_user_id = request.POST.get('teacher_user_id')
            new_teacher = Teacher.objects.get(user_id=teacher_user_id)
            new_date = request.POST.get('date')
            new_date_aware = timezone.make_aware(parse_datetime(new_date))
            today = timezone.now()
            old_date = obj.date
            time_diference = (old_date - today)

            teacher_task = Task.objects.filter(teacher=new_teacher, date=new_date_aware)
            student_task = Task.objects.filter(student=new_student, date=new_date_aware)
            if teacher_task:
                return JsonResponse({'created': False, 'message': 'exists'}, safe=False)
            elif student_task:
                return JsonResponse({'created': False, 'message': 'duplicated task'}, safe=False)

            if time_diference <= two_days and time_diference >= -one_day:
                return JsonResponse({
                    'msg':'Cannot change this booking, less than 48h'
                    })
            else:
                if time_diference < -one_day:
                    obj.delete()
                    return JsonResponse({
                        'msg':'Booking expired'
                        })
                else:
                    obj.date = new_date_aware
                    obj.teacher = new_teacher
                    obj.save()
                    return JsonResponse({
                        'teacher': obj.teacher.full_name(),
                        'date': obj.date
                        })
        else:
            return JsonResponse({
                'msg':'This booking is finished'
            })

@login_required
@allowed_users(allowed_roles=['teacher'])
def finish_task(request, pk):
    obj = Task.objects.get(pk=pk)
    if request.is_ajax():
        hour1 = datetime.timedelta(hours=1)
        today = timezone.now()
        old_date = obj.date
        time_diference = (old_date - today)
        if time_diference < -hour1 and time_diference >= -one_day: 
            obj.status = 'finished'
            obj.save()            
        
        return JsonResponse({
            'status': obj.status,
            })

@login_required
@allowed_users(allowed_roles=['student'])
def delete_task(request, pk):
    obj = Task.objects.get(pk=pk)
    if request.is_ajax():
        status = request.POST.get('status')
        today = timezone.now()
        old_date = obj.date
        time_diference = (old_date - today)

        if status == 'active':
            if time_diference <= one_day and time_diference >= -two_days: #can't delete task 24h before and 24h later, -2 has to be task_view -2
                return JsonResponse({ 
                    'msg':'Cannot delete this booking, less than 24h'
                    })
            else:
                obj.delete()
                return JsonResponse({})

        elif status == 'finished':
            return JsonResponse({
                    'msg':'This booking is finished.'
                    })

@login_required
@allowed_users(allowed_roles=['student'])
def create_task(request):
    if request.is_ajax():
        user_id = request.POST.get('user_id')
        student_obj = Student.objects.get(user_id=user_id)
        teacher_user_id = request.POST.get('teacher_user_id')
        teacher_obj = Teacher.objects.get(user_id=teacher_user_id)        
        date_obj = request.POST.get('date')
        new_date_aware = timezone.make_aware(parse_datetime(date_obj))
        teacher_task = Task.objects.filter(teacher=teacher_obj, date=new_date_aware)
        student_task = Task.objects.filter(student=student_obj, date=new_date_aware)
        if teacher_task:
            return JsonResponse({'created': False, 'message': 'exists'}, safe=False)
        elif student_task:
            return JsonResponse({'created': False, 'message': 'duplicated task'}, safe=False)
        Task.objects.create(student=student_obj, teacher=teacher_obj, date=new_date_aware)
        return JsonResponse({'created': True})
    return JsonResponse({'created': False}, safe=False)

@login_required
@allowed_users(allowed_roles=['student', 'teacher'])
def get_current_time(request):
    time_data = timezone.now()
    current_time = []
    current_time.append({
        "date_time": time_data.strftime('%Y%m%d%H'),
        # "date": time_data.strftime('%Y/%m/%d'),
        # "time": time_data.strftime('%H:%M:%S'),
        # "time2": timezone.now().strftime('%H:%M:%S')
        })
    return JsonResponse({'current_time': current_time})

@login_required
@allowed_users(allowed_roles=['teacher'])
def task_link(request, pk):
    obj = Task.objects.get(pk=pk)    
    if request.is_ajax():
        link = request.POST.get('link')
        status = request.POST.get('status')
        today = timezone.now()
        old_date = obj.date
        time_diference = (old_date - today)

        if status == 'active':
            if time_diference <= -one_day:
                return JsonResponse({
                    'msg':'expired'
                    })
            else:
                obj.lesson_link = link
                obj.save()
                return JsonResponse({})
        else:
            return JsonResponse({
                'msg':'This booking is finished'
            })

