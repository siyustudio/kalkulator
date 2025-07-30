let ekspresi = "";
  let tampilan = "";

  function formatRibuan(angka) {
    if (!angka) return "";
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function formatCampuran(exp) {
    const tokens = exp.match(/(\d+|\D)/g);
    if (!tokens) return "";
    return tokens.map(token => {
      if (/^\d+$/.test(token)) {
        return formatRibuan(token);
      } else if (token === "*") {
        return "×";
      } else if (token === "/") {
        return "÷";
      } else {
        return token;
      }
    }).join("");
  }

  function tekan(nilai) {
    if (nilai === '×') {
      ekspresi += '*';
    } else if (nilai === '÷') {
      ekspresi += '/';
    } else if (nilai === ',') {
      ekspresi += '.';
    } else if (nilai === '%') {
      ekspresi += '/100';
    } else {
      ekspresi += nilai;
    }

    tampilan = formatCampuran(ekspresi);
    document.getElementById("layar").value = tampilan;
  }

  function backspace() {
    ekspresi = ekspresi.slice(0, -1);
    tampilan = formatCampuran(ekspresi);
    document.getElementById("layar").value = tampilan;
  }

  function hapus() {
    ekspresi = "";
    tampilan = "";
    document.getElementById("layar").value = "";
  }

  function hitung() {
    try {
      const hasil = eval(ekspresi);
      const hasilFormat = new Intl.NumberFormat('id-ID').format(hasil);
      document.getElementById("layar").value = hasilFormat;
      ekspresi = hasil.toString();
      tampilan = hasilFormat;
    } catch {
      document.getElementById("layar").value = "Error";
      ekspresi = "";
      tampilan = "";
    }
  }

document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Angka dan titik
  if (!isNaN(key)) {
  tekan(key);
} else if (key === ",") {
  tekan(",");
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
  } else if (key === ",") {
    tekan(",")
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
