import moment from "moment";

export const formatCurrency = (value) => {
  const numberValue = Number(value);
  return !isNaN(numberValue) ? numberValue.toLocaleString("vi-VN") : "0";
};

export const isValid = (value) => /^[a-z0-9]{1,20}$/.test(value);
export const formatTime = (date) => {
  return moment.utc(date).local().format("DD/MM/YYYY-HH:mm:ss");
};
export const formatStatusCard = (statusCode) => {
  const responseMessages = {
    1: "Thẻ đúng",
    2: "Thẻ đúng sai giá",
    3: "Thẻ lỗi",
    4: "Hệ thống bảo trì",
    99: "Thẻ chờ xử lý",
    100: "Gửi thẻ thất bại - Có lý do đi kèm",
  };

  return responseMessages[statusCode] || "Mã trạng thái không hợp lệ";
};
