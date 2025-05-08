from django.shortcuts import render
from django.core.mail import send_mail
from django.http import HttpResponseRedirect, request
from django.views.generic.edit import FormView
from django.views.generic import View
from django.urls import reverse_lazy, reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import UserRegisterForm, UpdatePasswordForm
from .models import User
from .forms import LoginForm, VerifyForm
from .functions import code_generator

# Create your views here.
class UserRegisterView(FormView):
    template_name = 'users/create.html'
    form_class = UserRegisterForm
    success_url = '/register'

    def form_valid(self, form):
        # Generación código verificación
        code = code_generator()
        print(f"\n\n\nCódigo de verificación: {code}\n\n\n")
        user = User.objects.create_user(
            form.cleaned_data['username'],
            form.cleaned_data['email'],
            form.cleaned_data['password1'],
            names = form.cleaned_data['names'],
            last_name = form.cleaned_data['last_name'],
            gender = form.cleaned_data['gender'],
            register_cod = code
        )
        # Enviar código al email del usuario
        asunto = 'Confirmación de email'
        mensaje = f'Código de verificación: {code}'
        email_remitente = 'correo@correo.com'
        # send_mail(asunto, mensaje, email_remitente, [form.cleaned_data['email']])
        # Redirigimos a pantalla de verificación
        return HttpResponseRedirect(reverse('users_app:verify', kwargs={'pk':user.id}))
        # return super(UserRegisterView, self).form_valid(form)

class LoginView(FormView):
    template_name = 'users/login.html'
    form_class = LoginForm
    success_url = "/admin"

    def form_valid(self, form):
        """ Método para validar credenciales y loguear al usuario """
        user = authenticate(
            username = form.cleaned_data['username'],
            password = form.cleaned_data['password']
        )
        login(self.request, user)
        return super(LoginView, self).form_valid(form)

class UpdatePasswordView(LoginRequiredMixin, FormView):
    template_name = 'users/change_password.html'
    form_class = UpdatePasswordForm
    success_url = reverse_lazy('users_app:login')
    login_url = reverse_lazy('users_app:login')

    def form_valid(self, form):
        active_user = self.request.user
        user = authenticate(
            username = active_user.username,
            password = form.cleaned_data['password1']
        )
        if user:
            new_password = form.cleaned_data['password2']
            active_user.set_password(new_password)
            active_user.save()
        logout(self.request)
        return super(UpdatePasswordView, self).form_valid(form)

class ConfirmView(FormView):
    template_name = 'users/verification.html'
    form_class = VerifyForm
    success_url = reverse_lazy('users_app:login')

    def get_form_kwargs(self):
        """ Método para pasar parámetros al formulario """
        kwargs = super(ConfirmView, self).get_form_kwargs()
        kwargs['pk'] = self.kwargs['pk']
        return kwargs

    def form_valid(self, form):
        User.objects.filter(pk=self.kwargs['pk']).update(is_active=True)
        return super(ConfirmView, self).form_valid(form)

    def form_invalid(self, form):
        User.objects.filter(pk=self.kwargs['pk']).update(is_active=False)
        return super(ConfirmView, self).form_invalid(form)

class LogoutView(View):
    
    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponseRedirect(reverse('users_app:login'))
