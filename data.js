// DU LIEU CHO TRANG CONG CU - GUI AM LEN NON

const duLieuCongCu = {
    // Ngay ket thuc chien dich
    ngayKetThuc: "2026-10-30",

    // Tien do quyen gop vat pham
    vatPham: [
        {
            ten: "Áo ấm",
            daNhan: 1525,
            mucTieu: 3000,
            donVi: "chiếc"
        },
        {
            ten: "Quần",
            daNhan: 2510,
            mucTieu: 3000,
            donVi: "chiếc"
        },
        {
            ten: "Tất",
            daNhan: 2640,
            mucTieu: 3000,
            donVi: "đôi"
        },
        {
            ten: "Giày",
            daNhan: 1325,
            mucTieu: 3000,
            donVi: "đôi"
        },
        {
            ten: "Khăn",
            daNhan: 2259,
            mucTieu: 3000,
            donVi: "chiếc"
        },
        {
            ten: "Đồ Dùng Học Tập",
            daNhan: 2476,
            mucTieu: 3000,
            donVi: "bộ"
        }
    ],

    // Tien do quyen gop tien mat
    tienMat: {
        daNhan: 25296080,
        mucTieu: 50000000,
        soLuotUngHo: 217
    },

    tinhNguyenVien: {
        daThamGia: 56,
        mucTieu: 100
    }
};

const danhsachthanhvien = [
    {
        stt: 1,
        hvt: "Lò Đức Hải",
        ns: "17/09/2007",
        que: "Sông Mã, Sơn La",
        st: "Ca hát, nghe nhạc, chụp ảnh",
        vt: "Trưởng nhóm, Coder",
        nv: 5,
        anh: "https://cdn.upanhlaylink.com/i/ereazZfB.png",
        fb: "https://www.facebook.com/share/19YD4XxpmF/?mibextid=wwXIfr",
        role: "driver"
    },
    {
        stt: 2,
        hvt: "Nguyễn Khánh Linh",
        ns: "12/12/2007",
        que: "Thái Bình",
        st: "Ca hát, nghe nhạc, đọc sách",
        vt: "Navigator",
        nv: 4,
        anh: "https://cdn.upanhlaylink.com/i/WP29xh3O.png",
        fb: "https://www.facebook.com/share/19XXrSXw8A/",
        role: "navigator"
    },
    {
        stt: 3,
        hvt: "Tao Văn Đạt",
        ns: "05/09/2007",
        que: "Điện Biên",
        st: "Chơi game, nghe nhạc, bóng chuyền",
        vt: "Tester",
        nv: 4,
        anh: "https://cdn.upanhlaylink.com/i/q4HNMX2q.png",
        fb: "https://www.facebook.com/share/1DWsKhRd1o/?mibextid=wwXIfr",
        role: "tester"
    },
    {
        stt: 4,
        hvt: "Bùi Hoàng Hiệp",
        ns: "31/11/2007",
        que: "Sơn La",
        st: "Thể thao, chơi game, chơi bi-a",
        vt: "Reporter",
        nv: 4,
        anh: "https://cdn.upanhlaylink.com/i/xA4e78Up.png",
        fb: "https://www.facebook.com/share/1HtRGqeHop/?mibextid=wwXIfr",
        role: "reporter"
    }
];

const danhSachBaiViet = [
    {
        tieuDe: "Gửi Ấm Lên Non – Mang hơi ấm đến trẻ em vùng cao",
        ngayDang: "15/10/2026",
        anh: "https://cdn.upanhlaylink.com/i/JHQ0uQNu.jpg",
        moTaAnh: "Hoạt động giúp đỡ trẻ em"
    },
    {
        tieuDe: "Sức trẻ tình nguyện – Kết nối những trái tim nhân ái",
        ngayDang: "12/10/2026",
        anh: "https://cdn.upanhlaylink.com/i/LJLxXD0M.png",
        moTaAnh: "Hoạt động tình nguyện"
    },
    {
        tieuDe: "Trao tặng sách vở – Chắp cánh ước mơ đến trường",
        ngayDang: "10/10/2026",
        anh: "https://file.qdnd.vn/data/images/0/2020/06/01/dieuthuy/3%20nuoi%20duong%20nhung%20uoc%20mo%201.jpg?dpi=150&quality=100&w=575",
        moTaAnh: "Sách vở cho học sinh"
    },
    {
        tieuDe: "Áo ấm mùa đông – Món quà nhỏ, ý nghĩa lớn",
        ngayDang: "08/10/2026",
        anh: "https://cdn.upanhlaylink.com/i/i2goExtU.jpg",
        moTaAnh: "Quần áo từ thiện"
    },
    {
        tieuDe: "Chung tay gây quỹ vì trẻ em có hoàn cảnh khó khăn",
        ngayDang: "05/10/2026",
        anh: "https://cdn.upanhlaylink.com/i/TZlRkq6X.jpg",
        moTaAnh: "Hoạt động cộng đồng"
    },
    {
        tieuDe: "Góp một bàn tay, thắp sáng hy vọng cho trẻ em",
        ngayDang: "01/10/2026",
        anh: "https://image.sggp.org.vn/w680/Uploaded/2026/ofhjgmzcgkzt/2024_01_22/20240120-xuan-tinh-nguyen-10-4197.jpg.webp",
        moTaAnh: "Mọi người cùng làm việc thiện nguyện"
    }
];
