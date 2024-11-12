export function getInitials(name: string): string {
  const words = name.split(" ")
  const initials = words
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2)
  return initials
}
