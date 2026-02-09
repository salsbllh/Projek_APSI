const API_URL = "https://script.google.com/macros/s/AKfycbwJ2WpRGqrxbuAQ1Yz9VDHvvv-q3AF4joSYQz2JRivZdeGX9miRDws1rWdJGwbr9LnkDw/exec";

// --- FUNGSI UTAMA FETCH ---
async function sendData(data) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(data),
            // Header text/plain agar tidak kena blokir CORS browser
            headers: { "Content-Type": "text/plain" } 
        });
        return await res.json();
    } catch (err) {
        alert("Koneksi Error!");
        console.error(err);
        return null;
    }
}

// --- CEK SESSION LOGIN ---
function checkAuth(allowedRoles = []) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html";
        return null;
    }
    // Jika role user tidak ada di daftar yang diizinkan (kecuali array kosong = semua boleh)
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        alert("Akses Ditolak! Anda bukan " + allowedRoles.join("/"));
        window.location.href = "dashboard.html";
        return null;
    }
    return user;
}

// --- LOGOUT ---
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// --- FORMAT RUPIAH ---
const rupiah = (num) => new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(num);

// --- RENDER NAVBAR (Otomatis berdasarkan Role) ---
// ... kode fetch di atas tetap sama ...

// --- RENDER NAVBAR (Update Bagian Ini) ---
function renderNavbar() {
    const user = JSON.parse(localStorage.getItem("user"));
    const nav = document.getElementById("navbar");
    if(!user || !nav) return;

    let menu = `<a href="dashboard.html">Dashboard</a>`;
    
    if(user.role === 'pelanggan') {
        menu += `<a href="booking.html">Booking Baru</a>`;
        // Tambahan Menu Baru
        menu += `<a href="bayar_pelanggan.html">Bayar Tagihan</a>`;
    }
    if(user.role === 'admin') {
        menu += `<a href="kelola_booking.html">Kelola Booking</a>`;
        menu += `<a href="laporan.html">Laporan</a>`;
    }
    if(user.role === 'mekanik') {
        menu += `<a href="daftar_servis.html">Daftar Servis</a>`;
    }
    if(user.role === 'kasir') {
        menu += `<a href="pembayaran.html">Kasir</a>`;
    }

    menu += `<a onclick="logout()" style="color:red; cursor:pointer;">Logout (${user.nama})</a>`;
    nav.innerHTML = menu;
}

document.addEventListener("DOMContentLoaded", renderNavbar);

document.addEventListener("DOMContentLoaded", renderNavbar);