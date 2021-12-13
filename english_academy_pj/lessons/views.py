from django.shortcuts import render

from django.contrib.auth.decorators import login_required
from schedules.decorators import allowed_users
from .models import SupportAndSales

# Create your views here.
@login_required
# @allowed_users(allowed_roles=['student', 'teacher'])
def support_and_sales_view(request):
    qs_support = SupportAndSales.objects.all()
    context = {
        'supportandsales':qs_support,
    }
    return render(request, 'lessons/support-and-sales.html', context)