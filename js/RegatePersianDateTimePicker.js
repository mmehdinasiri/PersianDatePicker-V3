  function initDateTimePicker(target) {
        var name = target;

        //init date picker
        $('[data-target=' + name + ']').MdPersianDateTimePicker({
            Placement: 'bottom',
            Trigger: 'focus',
            EnableTimePicker: true,
            TargetSelector: '[data-target=' + name + ']',
            GroupId: '',
            Format: 'yyyy/MM/dd HH:mm:ss',
            EnglishNumber: true,
        });

        //init check
        var jalaliDate = convertor(name)
        $('[data-target=' + name + ']').val(jalaliDate);
        var strLength = $('[data-target=' + name + ']').val();

        if (!(strLength.length == 0)) {
            checker();
            $('.persianDateTimePicker__inputBox .persianDateTimePicker__clear').css('display', 'block');
        }


        //update checker
        $('[data-target=' + name + ']').on('change', function () {
            checker();
        })

        // convert miladi date to jalali
        function convertor(target) {
            var initDat = $('[data-check=' + name + ']').val();            
            if (initDat != '') {
                var JDate = require('jdate');
                var initDat = initDat.split(" ");
                var initTime = initDat[1];
                var jdate = new Date(initDat);
                shamsiDate = new JDate(jdate);
                shamsiDate.toLocaleString();
                initDat = [shamsiDate.getFullYear(), shamsiDate.getMonth(), shamsiDate.getDate()];

                if (initDat[1] < 10) {
                    initDat[1] = "0" + initDat[1];
                }
                if (initDat[2] < 10) {
                    initDat[2] = "0" + initDat[2];
                }

                initDat = initDat.join('/');
                if (initTime == null) {
                    initTime = '00' + ':' + '00' + ':' + '00';
                }
                var finalDat = initDat + " " + initTime;
                return finalDat;
            }
        }

        //update checker function
        function checker() {
            var strLength = $('[data-target=' + name + ']').val();
            if (!(strLength.length == 0)) {
                var jalaliDat = $('[data-target=' + name + ']').MdPersianDateTimePicker('getDate');
                var year = (jalaliDat).getFullYear();
                var month = (jalaliDat).getMonth() + 1;
                var day = (jalaliDat).getDate();
                var hours = (jalaliDat).getHours();
                var minutes = (jalaliDat).getMinutes();
                var Seconds = (jalaliDat).getSeconds();
                if (month < 10) {
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day;
                }

                $('[data-check=' + name + ']').val(year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + Seconds);
            } else {
                $('[data-check=' + name + ']').val('');
                $('.persianDateTimePicker__inputBox .persianDateTimePicker__clear').css('display', 'none');
            }
            
        }


        $('[data-target=' + name + ']').on('change', function () {
            if (!($(this).val()) == '') {
                $('.persianDateTimePicker__clear[data-target=' + name + ']').css('display', 'block');
            }
            else {
                $('.persianDateTimePicker__clear[data-target=' + name + ']').css('display', 'none');
            }
        });

        $('.persianDateTimePicker__clear[data-target=' + name + ']').click(function () {
            $('[data-target=' + name + ']').val('');
            $('[data-check=' + name + ']').val('');
            $('.persianDateTimePicker__clear[data-target=' + name + ']').css('display', 'none');
        });

    }