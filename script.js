let ekspresi = "";  // untuk dihitung eval()
let tampilan = "";  // untuk ditampilkan ke layar

function tekan(nilai) {
  if (nilai === '%') {
    ekspresi += '/100';
    tampilan += '%';
  } else if (nilai === '×') {
    ekspresi += '*';
    tampilan += '×';
  } else if (nilai === '÷') {
    ekspresi += '/';
    tampilan += '÷';
  } else {
    ekspresi += nilai;
    tampilan += nilai;
  }

  document.getElementById("layar").value = tampilan;
}

function hitung() {
  try {
    const hasil = eval(ekspresi);
    document.getElementById("layar").value = hasil;
    ekspresi = hasil.toString();
    tampilan = ekspresi;
  } catch (e) {
    document.getElementById("layar").value = "Error";
    ekspresi = "";
    tampilan = "";
  }
}

function hapus() {
  ekspresi = "";
  tampilan = "";
  document.getElementById("layar").value = "";
}

function backspace() {
  // Hapus 1 karakter terakhir dari ekspresi dan tampilan
  ekspresi = ekspresi.slice(0, -1);
  tampilan = tampilan.slice(0, -1);
  document.getElementById("layar").value = tampilan;
}

document.addEventListener("keydown", function(event) {
  const key = event.key;

  // Angka dan titik
  if (!isNaN(key) || key === ".") {
    tekan(key);
  }

  // Operator
  else if (key === "+") {
    tekan("+");
  } else if (key === "-") {
    tekan("-");
  } else if (key === "*") {
    tekan("×"); // tampil ×, hitung *
  } else if (key === "/") {
    tekan("÷"); // tampil ÷, hitung /
  } else if (key === "%") {
    tekan("%");
  }

  // Enter = hitung
  else if (key === "Enter") {
    hitung();
  }

  // Backspace = hapus 1 karakter
  else if (key === "Backspace") {
    backspace();
  }

  // Escape = hapus semua
  else if (key === "Escape") {
    hapus();
  }
});

