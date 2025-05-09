from rest_framework.permissions import BasePermission

class IsAdminUserRole(BasePermission):
    """
    Permite solo a usuarios con rol 'admin'.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'
