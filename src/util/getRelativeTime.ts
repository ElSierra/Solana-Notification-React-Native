export default function getRelativeTime(dateString: string): string {
    const inputDate = new Date(dateString);
    const now = new Date();
  
    // Check if the input date is valid
    if (isNaN(inputDate.getTime())) {
      return "Invalid date";
    }
  
    // Calculate the difference in milliseconds
    const diffMs = now.getTime() - inputDate.getTime();
  
    if (diffMs < 0) return "Invalid date: Future time";
  
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return "now";
    } else if (minutes < 60) {
      return `${minutes}${minutes === 1 ? "m" : "m"} `;
    } else if (hours < 24) {
      return `${hours}${hours === 1 ? "h" : "h"}`;
    } else {
      const time = inputDate.toTimeString().split(' ')[0].slice(0, 5); // Format: HH:MM
      return `${days}${days === 1 ? "d" : "d"} at ${time}`;
    }
  }
  
