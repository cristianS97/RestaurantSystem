export const getStatusLabel = (status: string) : string => {
    switch (status) {
        case "pending": return "Pendiente";
        case "served": return "Servido";
        case "cancelled": return "Cancelado";
        case "paid": return "Pagado";
        default: return status;
    }
};