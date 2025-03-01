export const formatCurrency = (value) => {
  return value?.toLocaleString("vi-VN");
};
export const isValid = (value) => /^[a-z0-9]{1,20}$/.test(value);
export const formatTime = (isoString, format = "DD/MM/YYYY HH:mm:ss") => {
  const date = new Date(isoString);

  const pad = (num) => String(num).padStart(2, "0"); // Thêm '0' nếu cần
  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1); // Tháng tính từ 0
  const year = date.getUTCFullYear();
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  switch (format) {
    case "DD/MM/YYYY HH:mm:ss":
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    case "DD-MM-YYYY HH:mm":
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    case "DD tháng MM, YYYY - HH:mm A":
      return `${day} tháng ${month}, ${year} - ${hours}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;
    default:
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
};
