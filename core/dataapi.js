$(document).ready(function () {
   // Mengubah variabel menjadi data dari json
   $.getJSON("/core/dummy2.json", function (data) {
      $("#num-positif").html(angkakoma(data.update.total.jumlah_positif) + ' <span class="badge rounded-pill bg-light text-dark">' + angkakoma(data.update.penambahan.jumlah_positif) + '</span>');
      $("#num-sembuh").html(angkakoma(data.update.total.jumlah_sembuh) + ' <span class="badge rounded-pill bg-light text-dark">' + angkakoma(data.update.penambahan.jumlah_sembuh) + '</span>');
      $("#num-meninggal").html(angkakoma(data.update.total.jumlah_meninggal) + ' <span class="badge rounded-pill bg-light text-dark">' + angkakoma(data.update.penambahan.jumlah_meninggal) + '</span>');
      $("#num-dirawat").html(angkakoma(data.update.total.jumlah_dirawat) + ' <span class="badge rounded-pill bg-light text-dark">' + angkakoma(data.update.penambahan.jumlah_dirawat) + '</span>');
      $("#tanggal").html("Update: " + formatdate(data.update.penambahan.created));

      // Menaruh data positif harian ke dalam array
      var grafik_positif = [];
      for (let i = 0; i < data.update.harian.length; i++) {
         grafik_positif.push(data.update.harian[i].jumlah_positif.value)
      }
      var label_grafik_positif = [];
      for (let i = 0; i < data.update.harian.length; i++) {
         date = new Date(data.update.harian[i].key);
         label_grafik_positif.push(date)
      }
      AssignToChart(label_grafik_positif, grafik_positif);
   }).fail(function () {
      console.log("An error has occurred.");
   });
});

// Menambahkan koma setiap tiga tigit angka
function angkakoma(x) {
   return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// Memperbaiki format tanggal
function formatdate(dateString) {
   var allDate = dateString.split(' ');
   var thisDate = allDate[0].split('-');
   var newDate = [thisDate[2], thisDate[1], thisDate[0]].join("-");
   return newDate;
}


function AssignToChart(label, target) {
   var ctx = document.getElementById("myChart").getContext("2d");
   var myChart = new Chart(ctx, {
      type: "line",
      options: {
         scales: {
            xAxes: [{
               display: false
            }],
            yAxes: [{
               display: true
            }],
         },
         animation: false,
         legend: {
            display: false
         },
         elements: {
            point:{
                radius: 2
            }
        }
      },
      data: {
         labels: label,
         datasets: [{
            label: "Kasus Positif",
            data: target,
            fill: false,
            borderColor: 'red',
         }, ],
      },
   });
}