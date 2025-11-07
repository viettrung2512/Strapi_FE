export function slugify(str) {
  str = str.toLowerCase();
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Xóa dấu
  str = str.replace(/[đĐ]/g, "d"); // Thay đ/Đ thành d
  str = str.replace(/[^a-z0-9\s-]/g, ""); // Xóa ký tự đặc biệt
  str = str.replace(/\s+/g, "-"); // Thay khoảng trắng bằng gạch nối
  str = str.replace(/-+/g, "-"); // Xóa gạch nối thừa
  str = str.replace(/^-+|-+$/g, ""); // Xóa gạch nối ở đầu/cuối
  return str;
}