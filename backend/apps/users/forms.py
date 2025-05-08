from django import forms
from django.contrib.auth import authenticate
from .models import User

class UserRegisterForm(forms.ModelForm):

    password1 = forms.CharField(
        label = 'Contraseña',
        required=True,
        widget = forms.PasswordInput(
            attrs = {
                'placeholder': 'Contraseña',
                'autocomplete': 'new-password'
            }
        )
    )

    password2 = forms.CharField(
        label = 'Repetir contraseña',
        required=True,
        widget = forms.PasswordInput(
            attrs = {
                'placeholder': 'Repetir contraseña',
                'autocomplete': 'new-password'
            }
        )
    )
    
    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'names',
            'last_name',
            'gender'
        )
        widgets = {
            'username': forms.TextInput(
                attrs= {
                    'autocomplete': 'new-text'
                }
            )
        }
    
    def clean_password(self):
        print(self.cleaned_data)
        if self.cleaned_data['password1'] != self.cleaned_data['password2']:
            self.add_error('password1', 'Las contraseñas son distintas')
            self.add_error('password2', 'Las contraseñas son distintas')
    
    def clean_password2(self):
        if len(self.cleaned_data['password1']) < 5 or len(self.cleaned_data['password2']) < 5:
            self.add_error('password1', 'La contraseña debe tener al menos 5 carácteres')
            self.add_error('password2', 'La contraseña debe tener al menos 5 carácteres')

class LoginForm(forms.Form):
    username = forms.CharField(
        label = 'Usuario',
        required=True,
        widget = forms.TextInput(
            attrs = {
                'placeholder': 'username',
                'style': 'margin: 10px',
                'autocomplete': 'new-text'

            }
        )
    )
    
    password = forms.CharField(
        label = 'Contraseña',
        required=True,
        widget = forms.PasswordInput(
            attrs = {
                'placeholder': 'Contraseña',
                'style': 'margin: 10px',
                'autocomplete': 'new-password'
            }
        )
    )

    def clean(self):
        cleaned_data = super(LoginForm, self).clean()
        username = self.cleaned_data['username']
        password = self.cleaned_data['password']

        if not authenticate(username=username, password=password):
            raise forms.ValidationError('Los datos ingresados son incorrectos')
        
        return cleaned_data

class UpdatePasswordForm(forms.Form):

    password1 = forms.CharField(
        label = 'Contraseña actual',
        required=True,
        widget = forms.PasswordInput(
            attrs = {
                'placeholder': 'Contraseña actual',
                'autocomplete': 'new-password'
            }
        )
    )

    password2 = forms.CharField(
        label = 'Nueva contraseña',
        required=True,
        widget = forms.PasswordInput(
            attrs = {
                'placeholder': 'Nueva contraseña',
                'autocomplete': 'new-password'
            }
        )
    )

class VerifyForm(forms.Form):
    codigo_registro = forms.CharField(
        label='Código de registro',
        max_length=6,
        required=True
    )

    def __init__(self, pk, *args, **kwargs):
        """ Método para recibir parámetros """
        self.pk_user = pk
        super(VerifyForm, self).__init__(*args, **kwargs)

    def clean_codigo_registro(self):
        codigo = self.cleaned_data['codigo_registro']

        if len(codigo) != 6:
            raise forms.ValidationError('El código no es válido')
        if not User.objects.get_code_validation(self.pk_user, codigo):
            raise forms.ValidationError('El código no es válido')
