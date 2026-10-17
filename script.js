const nutmenu = document.getElementById("nutmenu");
const menuchinh = document.getElementById("menu-chinh");

if (nutmenu && menuchinh) {
    nutmenu.addEventListener("click", function () {
        const dangmo = menuchinh.classList.toggle("hienmenu");

        nutmenu.setAttribute("aria-expanded", dangmo);

        nutmenu.textContent = dangmo
            ? "✕ Đóng menu"
            : "☰ Menu";
    });
}

// ====================================
// 1. CAC HAM DUNG CHUNG
// ====================================

// Dinh dang so theo cach viet cua Viet Nam
function dinhdangso(so) {
    return Number(so).toLocaleString("vi-VN");
}

// Tinh phan tram tien do
function tinhphantram(danhan, muctieu) {
    if (muctieu <= 0) {
        return 0;
    }

    return Math.min(100, Math.max(0, danhan / muctieu * 100));
}

// Cap nhat thanh tien do
function capnhatthanh(idThanh, idPhanTram, danhan, muctieu) {
    const thanh = document.getElementById(idThanh);
    const phantram = document.getElementById(idPhanTram);

    if (!thanh || !phantram) {
        return;
    }

    const phantramthucte = tinhphantram(danhan, muctieu);

    thanh.style.width = phantramthucte + "%";
    phantram.textContent = phantramthucte.toFixed(1) + "%";

    const thanhnen = thanh.parentElement;

    if (thanhnen) {
        thanhnen.setAttribute(
            "aria-valuenow",
            Math.round(phantramthucte)
        );
    }
}


// ====================================
// 2. HIEN THI TIEN DO VAT PHAM
// ====================================

function hienThiVatPham() {
    const khung = document.getElementById("danhsachvatpham");

    if (!khung || typeof duLieuCongCu === "undefined") {
        return;
    }

    khung.innerHTML = "";

    duLieuCongCu.vatPham.forEach(function (vatpham, index) {
        const phantram = tinhphantram(
            vatpham.daNhan,
            vatpham.mucTieu
        );

        const muc = document.createElement("div");
        muc.className = "mucvatpham";

        const ten = document.createElement("h3");
        ten.textContent = (index + 1) + ". " + vatpham.ten;

        const soluong = document.createElement("p");
        soluong.textContent =
            dinhdangso(vatpham.daNhan) + " / " +
            dinhdangso(vatpham.mucTieu) + " " +
            vatpham.donVi;

        const thanhnen = document.createElement("div");
        thanhnen.className = "thanhnen";
        thanhnen.setAttribute("role", "progressbar");
        thanhnen.setAttribute(
            "aria-label",
            "Tiến độ " + vatpham.ten
        );
        thanhnen.setAttribute("aria-valuemin", "0");
        thanhnen.setAttribute("aria-valuemax", "100");
        thanhnen.setAttribute(
            "aria-valuenow",
            Math.round(phantram)
        );

        const thanhmau = document.createElement("div");
        thanhmau.className = "thanhmau";
        thanhmau.style.width = phantram + "%";

        thanhnen.appendChild(thanhmau);

        const nhanphantram = document.createElement("p");
        nhanphantram.className = "phantramvatpham";
        nhanphantram.textContent = phantram.toFixed(1) + "%";

        muc.appendChild(ten);
        muc.appendChild(soluong);
        muc.appendChild(thanhnen);
        muc.appendChild(nhanphantram);

        khung.appendChild(muc);
    });
}


// ====================================
// 3. HIEN THI TIEN DO TIEN MAT
// ====================================

function hienThiTienMat() {
    if (typeof duLieuCongCu === "undefined") {
        return;
    }

    const tien = duLieuCongCu.tienMat;

    const sotien = document.getElementById("sotien");
    const muctieu = document.getElementById("muctieu-tien");
    const soluot = document.getElementById("soluotungho");

    if (sotien) {
        sotien.textContent = dinhdangso(tien.daNhan) + " đ";
    }

    if (muctieu) {
        muctieu.textContent = dinhdangso(tien.mucTieu) + " đ";
    }

    if (soluot) {
        soluot.textContent = dinhdangso(tien.soLuotUngHo) + " lượt";
    }

    capnhatthanh(
        "thanhmau-tien",
        "phantram-tien",
        tien.daNhan,
        tien.mucTieu
    );
}


// ====================================
// 4. HIEN THI TIEN DO TINH NGUYEN VIEN
// ====================================

function hienThiTinhNguyenVien() {
    if (typeof duLieuCongCu === "undefined") {
        return;
    }

    const tnv = duLieuCongCu.tinhNguyenVien;
    const soluong = document.getElementById("sotinhnguyenvien");

    if (soluong) {
        soluong.textContent =
            dinhdangso(tnv.daThamGia) + " / " +
            dinhdangso(tnv.mucTieu) + " người";
    }

    capnhatthanh(
        "thanhmau-tnv",
        "phantram-tnv",
        tnv.daThamGia,
        tnv.mucTieu
    );
}


// ====================================
// 5. TINH SO NGAY CON LAI
// ====================================

function hienThiThoiGian() {
    if (typeof duLieuCongCu === "undefined") {
        return;
    }

    const khung = document.getElementById("songayconlai");

    if (!khung) {
        return;
    }

    // Lay ngay ket thuc tu data.js
    const ngayKetThuc = duLieuCongCu.ngayKetThuc;
    const ngayDich = new Date(ngayKetThuc + "T00:00:00");
    const homNay = new Date();

    homNay.setHours(0, 0, 0, 0);

    if (Number.isNaN(ngayDich.getTime())) {
        khung.textContent = "Chưa thiết lập ngày kết thúc chiến dịch.";
        return;
    }

    const chenhlech = ngayDich.getTime() - homNay.getTime();
    const songay = Math.ceil(chenhlech / (1000 * 60 * 60 * 24));

    if (songay > 0) {
        khung.textContent = "Còn " + songay + " ngày";
    } else if (songay === 0) {
        khung.textContent = "Chiến dịch kết thúc hôm nay";
    } else {
        khung.textContent = "Chiến dịch đã kết thúc";
    }
}

    const cacNutAccordion = document.querySelectorAll(".accordion-nut");

    cacNutAccordion.forEach(function(nut) {
        nut.addEventListener("click", function() {
            const muc = nut.parentElement;
            muc.classList.toggle("dangmo");
        });
    });

// ====================================
// 6. CHAY CAC CHUC NANG TRANG CONG CU
// ====================================

function khoiTaoCongCu() {
    if (typeof duLieuCongCu === "undefined") {
        return;
    }

    hienThiVatPham();
    hienThiTienMat();
    hienThiTinhNguyenVien();
    hienThiThoiGian();
}

// Chi chay khi HTML da duoc doc xong
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", khoiTaoCongCu);
} else {
    khoiTaoCongCu();
}

// ===== HIỂN THỊ THÀNH VIÊN NHÓM TÌNH NGUYỆN =====
(function () {
    const khungThanhVien = document.getElementById("danhsachthanhvien");
    const oTimKiem = document.getElementById("timkiemthanhvien");
    const oLocVaiTro = document.getElementById("locvaitro");
    const nutBoLoc = document.getElementById("nutbolocthanhvien");
    const thongBao = document.getElementById("thongbaothanhvien");

    const modal = document.getElementById("modalthanhvien");
    const nutDongModal = document.getElementById("dongmodal");
    let nutMoModalTruocDo = null;
    const tenModal = document.getElementById("tenmodal");
    const noiDungModal = document.getElementById("noidungmodal");

    // Trang khác không có khu vực thành viên thì không chạy phần này.
    if (
        !khungThanhVien ||
        !oTimKiem ||
        !oLocVaiTro ||
        !nutBoLoc ||
        !modal ||
        !nutDongModal ||
        !tenModal ||
        !noiDungModal ||
        typeof danhsachthanhvien === "undefined"
    ) {
        return;
    }

    // Trạng thái thành viên theo số nhiệm vụ trong dữ liệu mẫu.
    function layTrangThai(soNhiemVu) {
        return Number(soNhiemVu) >= 4
            ? "Tích cực"
            : "Bình thường";
    }

    // Chuyển nội dung thành văn bản an toàn trước khi đưa vào HTML.
    function maHoaHTML(giaTri) {
        return String(giaTri ?? "").replace(/[&<>"']/g, function (kyTu) {
            const bangMa = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return bangMa[kyTu];
        });
    }

    function hienThiThanhVien(danhSach) {
        khungThanhVien.innerHTML = "";

        if (danhSach.length === 0) {
            thongBao.textContent = "Không tìm thấy thành viên phù hợp.";
            return;
        }

        thongBao.textContent = "";

        for (const tv of danhSach) {
            const the = document.createElement("article");
            the.className = "thethanhvien";

            the.innerHTML = `
                <div class="noidung-thethanhvien">
                    <img
                        src="${maHoaHTML(tv.anh)}"
                        class="anh-thanhvien"
                        alt="Ảnh ${maHoaHTML(tv.hvt)}"
                        loading="lazy"
                    >

                    <h3 class="ten-thanhvien">
                        ${maHoaHTML(tv.hvt)}
                    </h3>

                    <p class="vaitro-thanhvien">
                        ${maHoaHTML(tv.vt)}
                    </p>

                    <span class="trangthai-thanhvien">
                        ${layTrangThai(tv.nv)}
                    </span>

                    <button
                        type="button"
                        class="nutxemchitiet"
                        aria-label="Xem chi tiết ${maHoaHTML(tv.hvt)}"
                    >
                        Xem chi tiết
                    </button>
                </div>
            `;

            the.querySelector(".nutxemchitiet").addEventListener(
                "click",
                function () {
                    moChiTietThanhVien(tv);
                }
            );

            khungThanhVien.appendChild(the);
        }
    }

    function moChiTietThanhVien(tv) {
        nutMoModalTruocDo = document.activeElement;
        tenModal.textContent = tv.hvt;

        const lienKetFacebook = String(tv.fb || "");
        const facebookHopLe =
            /^https:\/\/www\.facebook\.com\//i.test(lienKetFacebook);

        
noiDungModal.innerHTML = `
<div class="chitiet-thanhvien">
    <p>
        <i class="bi bi-calendar-heart"></i>
        <strong>Ngày sinh:</strong>
        ${maHoaHTML(tv.ns)}
    </p>

    <p>
        <i class="bi bi-geo-alt-fill"></i>
        <strong>Quê quán:</strong>
        ${maHoaHTML(tv.que)}
    </p>

    <p>
        <i class="bi bi-heart-fill"></i>
        <strong>Sở thích:</strong>
        ${maHoaHTML(tv.st)}
    </p>

    <p>
        <i class="bi bi-person-badge-fill"></i>
        <strong>Vai trò:</strong>
        ${maHoaHTML(tv.vt)}
    </p>

    <p>
        <i class="bi bi-list-check"></i>
        <strong>Số nhiệm vụ:</strong>
        ${maHoaHTML(tv.nv)}
    </p>

    <p>
        <i class="bi bi-patch-check-fill"></i>
        <strong>Trạng thái:</strong>
        ${layTrangThai(tv.nv)}
    </p>
</div>

<div class="anh-modal-khuvuc">
    <div class="anh-modal-box">
        <img
            src="${maHoaHTML(tv.anh)}"
            class="anh-modal"
            alt="Ảnh ${maHoaHTML(tv.hvt)}"
        >
    </div>

    ${
        facebookHopLe
            ? `<a
                href="${maHoaHTML(lienKetFacebook)}"
                class="lienket-facebook"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i class="bi bi-facebook"></i>
                Xem Facebook ↗
            </a>`
            : ""
    }
</div>
`;


        modal.classList.add("dangmo");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        nutDongModal.focus();
    }

    function dongChiTietThanhVien() {
        // Chuyển focus ra khỏi modal trước khi ẩn
        if (nutMoModalTruocDo && nutMoModalTruocDo.isConnected) {
            nutMoModalTruocDo.focus();
        } else {
            nutDongModal.blur();
        }
    
        // Đóng modal
        modal.classList.remove("dangmo");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function locThanhVien() {
        const tuKhoa = oTimKiem.value.trim().toLowerCase();
        const vaiTro = oLocVaiTro.value;

        const ketQua = danhsachthanhvien.filter(function (tv) {
            const tenPhuHop = tv.hvt.toLowerCase().includes(tuKhoa);
            const vaiTroPhuHop = vaiTro === "all" || tv.role === vaiTro;

            return tenPhuHop && vaiTroPhuHop;
        });

        hienThiThanhVien(ketQua);
    }

    // Tìm kiếm ngay khi gõ.
    oTimKiem.addEventListener("input", locThanhVien);

    // Lọc khi đổi vai trò.
    oLocVaiTro.addEventListener("change", locThanhVien);

    // Đưa bộ lọc về trạng thái ban đầu.
    nutBoLoc.addEventListener("click", function () {
        oTimKiem.value = "";
        oLocVaiTro.value = "all";
        locThanhVien();
    });

    nutDongModal.addEventListener("click", dongChiTietThanhVien);

    // Bấm vùng nền bên ngoài hộp thoại để đóng.
    modal.addEventListener("click", function (suKien) {
        if (suKien.target === modal) {
            dongChiTietThanhVien();
        }
    });

    // Nhấn Escape để đóng hộp thoại.
    document.addEventListener("keydown", function (suKien) {
        if (suKien.key === "Escape" && modal.classList.contains("dangmo")) {
            dongChiTietThanhVien();
        }
    });

    // Hiển thị tất cả thành viên khi vừa mở trang.
    hienThiThanhVien(danhsachthanhvien);
})();

(function () {
    const khungBaiViet = document.getElementById("danhsach-baiviet");

    // Chỉ chạy khi trang có khu vực hiển thị bài viết
    if (!khungBaiViet) {
        return;
    }

    // Lấy dữ liệu từ data.js
    if (typeof danhSachBaiViet === "undefined") {
        khungBaiViet.textContent = "Chưa tải được dữ liệu bài viết.";
        return;
    }

    // Duyệt qua từng bài viết và tạo thẻ HTML
    danhSachBaiViet.forEach(function (baiViet) {
        const theBaiViet = document.createElement("article");
        theBaiViet.className = "the-baiviet";

        const anh = document.createElement("img");
        anh.src = baiViet.anh;
        anh.alt = baiViet.moTaAnh;
        anh.loading = "lazy";

        const tieuDe = document.createElement("h4");
        tieuDe.textContent = baiViet.tieuDe;

        const ngayDang = document.createElement("p");
        ngayDang.textContent = "Ngày đăng: " + baiViet.ngayDang;

        theBaiViet.appendChild(anh);
        theBaiViet.appendChild(tieuDe);
        theBaiViet.appendChild(ngayDang);

        khungBaiViet.appendChild(theBaiViet);
    });
})();


const formTNV = document.getElementById("formtnv");
// Hàm hiện thông báo bằng jQuery
function hienThongBao(noiDung, loai) {
    $("#thongbaotnv")
        .stop(true, true)
        .removeClass("thanh-cong canh-bao")
        .addClass(loai)
        .text(noiDung)
        .slideDown(300);
}

if (formTNV) {
    formTNV.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Đã chặn gửi form");

        const cacTruongBatBuoc = [
            { id: "hoten", ten: "Họ và tên" },
            { id: "ngaysinh", ten: "Ngày sinh" },
            { id: "mssv", ten: "Mã số sinh viên" },
            { id: "lopkhoa", ten: "Lớp / Khoa" },
            { id: "sodienthoai", ten: "Số điện thoại" },
            { id: "email", ten: "Email" },
            { id: "suckhoe", ten: "Tình trạng sức khỏe chung" },
            { id: "theluc", ten: "Khả năng thể lực" }
        ];

        const cacMucChuaNhap = [];

        cacTruongBatBuoc.forEach(function (truong) {
            const oNhap = document.getElementById(truong.id);

            if (oNhap && oNhap.value.trim() === "") {
                cacMucChuaNhap.push(truong.ten);
            }
        });

        // Kiểm tra các trường còn thiếu
        if (cacMucChuaNhap.length > 0) {
            hienThongBao(
                "Vui lòng hoàn thành: " + cacMucChuaNhap.join(", "),
                "canh-bao"
            );
            return;
        }

        // Kiểm tra định dạng dữ liệu
        if (!formTNV.checkValidity()) {
            hienThongBao(
                "Thông tin chưa hợp lệ. Vui lòng kiểm tra lại email và các trường đã nhập.",
                "canh-bao"
            );
            formTNV.reportValidity();
            return;
        }

        // Chỉ thông báo thành công khi dữ liệu hợp lệ
        hienThongBao(
            "Đăng ký thành công! Cảm ơn bạn đã tham gia chiến dịch Gửi Ấm Lên Non.",
            "thanh-cong"
        );

        formTNV.reset();
    });
}

function hienThongBao(noiDung, loai) {
    $("#thongbaotnv")
        .stop(true, true)
        .removeClass("thanh-cong canh-bao")
        .addClass(loai)
        .text(noiDung)
        .slideDown(300);
}

// CONG CU QUY DOI GOI QUA
(function () {
    // 1. Du lieu mau cua cac vat pham
    const duLieuGoiQua = {
        aoAm: 150000,
        doiUng: 50000
    };

    // 2. Lay cac phan tu HTML
    const oNhapTien = document.getElementById("sotienquyengop");
    const thanhTien = document.getElementById("thanhtien");

    const nut200 = document.getElementById("dungthu200");
    const nut1000 = document.getElementById("dungthu1000");
    const nutDatLai = document.getElementById("datlai");

    const soGoiQua = document.getElementById("sogoiqua");
    const chiTietGoi = document.getElementById("chitietgoi");
    const soTienConLai = document.getElementById("sotienconlai");

    if (
        !oNhapTien ||
        !thanhTien ||
        !nut200 ||
        !nut1000 ||
        !nutDatLai ||
        !soGoiQua ||
        !chiTietGoi ||
        !soTienConLai
    ) {
        return;
    }

    // 3. Dinh dang so tien theo tien Viet Nam
    function dinhDangTien(soTien) {
        return soTien.toLocaleString("vi-VN") + "đ";
    }

    // 4. Tinh va hien thi ket qua
    function tinhGoiQua() {
        const soTien = Number(oNhapTien.value);

        if (
            oNhapTien.value.trim() === "" ||
            !Number.isFinite(soTien) ||
            soTien < 0 ||
            soTien > 2000000
        ) {
            soGoiQua.textContent = "Vui lòng nhập số tiền từ 0đ đến 2.000.000đ.";
            chiTietGoi.textContent = "";
            soTienConLai.textContent = "";
            return;
        }

        // Dong bo gia tri voi thanh truot
        thanhTien.value = Math.round(soTien / 50000) * 50000;

        // Tinh gia mot goi qua gom ao am va doi ung
        const giaGoiQua = duLieuGoiQua.aoAm + duLieuGoiQua.doiUng;

        // Tinh so goi qua tron ven va so tien du
        const soGoi = Math.floor(soTien / giaGoiQua);
        const tienDu = soTien - soGoi * giaGoiQua;

        soGoiQua.textContent =
            "Tương đương " + soGoi + " gói quà ấm.";

        if (soGoi > 0) {
            chiTietGoi.textContent =
                "Mỗi gói gồm 1 áo ấm và 1 đôi giày, theo đơn giá minh họa.";
        } else {
            chiTietGoi.textContent =
                "Khoản tiền hiện tại chưa đủ một gói quà ấm hoàn chỉnh.";
        }

        soTienConLai.textContent =
            "Phần tiền còn lại sau khi quy đổi: " + dinhDangTien(tienDu) + ".";
    }

    // 5. Nhap tien thi cap nhat ket qua
    oNhapTien.addEventListener("input", function () {
        tinhGoiQua();
    });

    // 6. Keo thanh truot thi cap nhat o nhap va ket qua
    thanhTien.addEventListener("input", function () {
        oNhapTien.value = thanhTien.value;
        tinhGoiQua();
    });

    // 7. Nut dung thu voi du lieu mau
    nut200.addEventListener("click", function () {
        oNhapTien.value = 200000;
        thanhTien.value = 200000;
        tinhGoiQua();
    });

    nut1000.addEventListener("click", function () {
        oNhapTien.value = 1000000;
        thanhTien.value = 1000000;
        tinhGoiQua();
    });

    // 8. Nut dat lai
    nutDatLai.addEventListener("click", function () {
        oNhapTien.value = 200000;
        thanhTien.value = 200000;
        tinhGoiQua();
    });

    // 9. Hien thi ket qua ngay khi mo trang
    tinhGoiQua();
})();

if (typeof jQuery !== "undefined") {
    jQuery(function ($) {
        $(".nut-huongdan").on("click", function () {
            const noiDung = $(this).next(".noidung-huongdan");
            const dangMo = noiDung.is(":visible");

            $(".noidung-huongdan").stop(true, true).slideUp(250);
            $(".nut-huongdan span").text("+");

            if (!dangMo) {
                noiDung.stop(true, true).slideDown(250);
                $(this).find("span").text("−");
            }
        });
    });
}
