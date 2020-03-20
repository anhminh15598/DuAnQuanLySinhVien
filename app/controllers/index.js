



var renderTableSV = function (result) {
    var noiDung = '';
    //Duyệt kết quả sinh viên trả về
    for (var i = 0; i < result.data.length; i++) {
        var sinhVien = result.data[i];
        //Hàm làm tròn .toFixed => lấy ra 2 số làm tròn
        var dtb = ((sinhVien.DiemToan + sinhVien.DiemLy + sinhVien.DiemHoa) / 3).toFixed(2);
        //Mỗi lần duyệt dùng dữ liệu 1 sinh viên tạo ra 1 tr sinh viên tương ứng
        noiDung += `
            <tr>
                <td>${sinhVien.MaSV}</td>
                <td>${sinhVien.HoTen}</td>
                <td>${sinhVien.Email}</td>
                <td>${sinhVien.SoDT}</td>
                <td>${sinhVien.CMND}</td>
                <td>${sinhVien.DiemToan}</td>
                <td>${sinhVien.DiemLy}</td>
                <td>${sinhVien.DiemHoa}</td>
                <td>${dtb}</td>
                <td>
                    <button class="btn btn-primary btnSua" onclick="suaSinhVien('${sinhVien.MaSV}')">Sửa</button>
                    <button class="btn btn-danger btnXoa" onclick ="xoaSinhVien('${sinhVien.MaSV}')">Xoá</button>
                </td>
            </tr>
        `;
    }
    document.querySelector('#tblSinhVien').innerHTML = noiDung;
}

//Phuong thuc sua sinh vien
var suaSinhVien = function (maSV) {
    // console.log(maSV);
    //Bước 1: Open popup modal
    document.querySelector('#btnThemSinhVien').click();

    //Buoc 2: Chinh sua title
    document.querySelector('.modal-title').innerHTML = 'Cập nhật thông tin sinh viên';
    document.querySelector('.modal-footer').innerHTML = `    
    <button class='btn btn-primary btn-capnhat' onclick='capNhatSinhVien()'>Lưu</button>
    `;
    //Bước 3: dùng mã sinh viên để lấy thông tin sinh viên từ server qua API
    sinhVienService.LayThongTinSinhVien(maSV).then(function (res) {
        // console.log(res.data);
        //Lấy đối tượng sinh viên từ server trả về gán cho biến sinh viên
        var sinhVien = res.data;
        //buoc4: Sau khi lấy data từ server về load lại trên các control input
        domSelect('#MaSV').value = sinhVien.MaSV;
        domSelect('#HoTen').value = sinhVien.HoTen;
        domSelect('#Email').value = sinhVien.Email;
        domSelect('#SoDT').value = sinhVien.SoDT;
        domSelect('#CMND').value = sinhVien.CMND;
        domSelect('#DiemToan').value = sinhVien.DiemToan;
        domSelect('#DiemLy').value = sinhVien.DiemLy;
        domSelect('#DiemHoa').value = sinhVien.DiemHoa;

    }).catch(function (err) {
        console.log(err);
    })
}

var domSelect = function (selector) {
    return document.querySelector(selector);
}

var capNhatSinhVien = function () {
    //Khi bấm nút lưu thì sẽ lấy thông tin từ người dùng nhập vào sau khi sửa => gọi phương thức lưu API
    var MaSV = document.querySelector('#MaSV').value;
    var HoTen = document.querySelector('#HoTen').value;
    var Email = document.querySelector('#Email').value;
    var SoDT = document.querySelector('#SoDT').value;
    var CMND = document.querySelector('#CMND').value;
    var DiemToan = document.querySelector('#DiemToan').value;
    var DiemLy = document.querySelector('#DiemLy').value;
    var DiemHoa = document.querySelector('#DiemHoa').value;

    var svUpdate = new SinhVien(MaSV, HoTen, Email, SoDT, CMND, DiemToan, DiemLy, DiemHoa);

    //Gọi API 
    sinhVienService.CapNhatSinhVien(svUpdate).then(function (res) {
        console.log(res)
        location.reload();
    }).catch(function (err) {
        console.log(err);
    })

}

var xoaSinhVien = function (maSV) {
    var cfDiaLog = confirm(`Ban co muon xoa sinh vien ${maSV} nay khong ?`);
    if (cfDiaLog === true) {
        sinhVienService.XoaSinhVien(maSV).then(function (result) {
            location.reload();
        }).catch(function (err) {
            alert('xoa that bai');
        })
    }
}



//tạo đối tượng  từ lớp đối tượng QuanLySinhVienService để gọi api
var sinhVienService = new QuanLySinhVienService();
var promiseGetSinhVien = sinhVienService.LayDanhSachSinhVien();
promiseGetSinhVien.then(renderTableSV).catch(function (err) {

})

//Cài đăt tính năng cho nút thêm sinh viên
document.querySelector('#btnThemSinhVien').onclick = function () {
    //Thay đổi model heading
    document.querySelector('.modal-title').innerHTML = 'THÊM SINH VIÊN';
    //Them nut them sinh vien
    document.querySelector('.modal-footer').innerHTML = `
    <button class="btn btn-success btnTaoMoiSinhVien" onclick="themMoiSinhVien()">Tạo mới SV</button>
    `;
}

// document.querySelector('.btnTaoMoiSinhVien').addEventListener.addEventListener('click', function () {
//     alert(1)
// })

var themMoiSinhVien = function () {
    //Lấy thông tin người dùng nhập từ giao diện vào
    var MaSV = document.querySelector('#MaSV').value;
    var HoTen = document.querySelector('#HoTen').value;
    var Email = document.querySelector('#Email').value;
    var SoDT = document.querySelector('#SoDT').value;
    var CMND = document.querySelector('#CMND').value;
    var DiemToan = document.querySelector('#DiemToan').value;
    var DiemLy = document.querySelector('#DiemLy').value;
    var DiemHoa = document.querySelector('#DiemHoa').value;

    //Tạo object chứa thông tin người dùng
    var sv = new SinhVien(MaSV, HoTen, Email, SoDT, CMND, DiemToan, DiemLy, DiemHoa);



    //Gọi api Back-end đưa thông tin lên server lưu trữ
    sinhVienService.ThemSinhVien(sv).then(function (result) {
        console.log('thanh cong');
        location.reload;
    }).catch(function (err) {
        // console.log();
        //Load lai trang de goi lai api layDanhSachSinhVienKiemTra

        console.log(err);
    })
}