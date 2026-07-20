export function formatDate(data) {
    return new Date(data).toLocaleDateString('pt-BR', {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}