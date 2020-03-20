var QuanLySinhVienService = function () {
    //Lớp đối tượng chứa các phương thức giao tiếp với server (BE)
    this.LayDanhSachSinhVien = function () {
        //promise
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
            method: 'GET',
        })
    }
    this.ThemSinhVien = function (sinhVien) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
            method: 'POST',
            data: sinhVien//Thuộc tính chứa dữ liệu đưa lên server (Lưu ý)
        })
    }
    this.XoaSinhVien = function (maSinhVien) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/' + maSinhVien,
            method: 'DELETE',
        })
    }
    this.CapNhatSinhVien = function (sinhVien) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien',
            method: 'PUT',
            data: sinhVien //Thuoc tính chứa dữ liêu đưa server (Lưu ý phải đúng object mẫu BE cung cấp)
        })
    }
    this.LayThongTinSinhVien = function (maSV) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/' + maSV,
            method: 'GET',
        })
    }
}