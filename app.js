$("select[name='sp_ulke']").change(function () {
    var sp_ulke = $(this).val();
    $.ajax({
        url: "https://green.ukofenglobal.com/siparis/ajax.php?type=getsehirler&sp_ulke=" + sp_ulke,
        method: "GET",
        success: function (data) {
            var rJson = $.parseJSON(data);
            if (rJson.status) {
                var sehirler = $("select[name='sp_sehir'] option");
                sehirler.each(function (e, v) {
                    if ($(v).val() != 0) {
                        $(this).remove();
                    }
                });

                var ilceler = $("select[name='sp_ilce'] option");
                ilceler.each(function (e, v) {
                    if ($(v).val() != 0) {
                        $(this).remove();
                    }
                });

                rJson.data.forEach(function (e, v) {
                    console.log(v);
                    $("select[name='sp_sehir']").append("<option value='" + e.sehir_id + "'>" + e.sehir_adi.toUpperCase() + "</option>");
                })
            }
        }
    })
});

$("select[name='sp_sehir']").change(function () {
    var sp_sehir = $(this).val();
    $.ajax({
        url: "ajax.php?type=getIlceler&sp_sehir=" + sp_sehir,
        method: "GET",
        success: function (data) {
            var rJson = $.parseJSON(data);
            if (rJson.status) {
                var ilceler = $("select[name='sp_ilce'] option");
                ilceler.each(function (e, v) {
                    if ($(v).val() != 0) {
                        $(this).remove();
                    }
                });

                if (rJson.data.length) {
                    rJson.data.forEach(function (e, v) {
                        $("select[name='sp_ilce']").css("display", "inline");
                        $("select[name='sp_ilce']").append("<option value='" + e.ilce_id + "'>" + e.ilce_adi.toUpperCase() + "</option>");
                        $("select[name='sp_ilce']").attr("required", "required");
                    })
                } else {
                    $("select[name='sp_ilce']").removeAttr("required");
                    $("select[name='sp_ilce']").css("display", "none");
                }

            }
        }
    })
});

$("input[name='urun_paket']").change(function () {
    var urun_paket = $(this).val();
    $.ajax({
        url: "ajax.php?type=getVaryasyonlar&urun_paket=" + urun_paket,
        method: "get",
        success: function (data) {
            $("#varyasyon_alan").html(data);
        }
    })
});
