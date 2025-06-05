from rest_framework.permissions import BasePermission

class IsAdminUserRole(BasePermission):
    """
    Permite solo a usuarios con rol 'admin'.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class IsWaiter(BasePermission):
    """
    Permite solo a usuarios con rol 'waiter'.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'waiter'

class IsChef(BasePermission):
    """
    Permite solo a usuarios con rol 'chef'.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'chef'

class IsCashier(BasePermission):
    """
    Permite solo a usuarios con rol 'cashier'.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'cashier'
