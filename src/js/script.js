var MainScript = (function () {
    var self = this;
    var REX_IS_NUMBER = new RegExp('^[0-9]*$');
    var REX_LOWERCASE = new RegExp('(?=.*[a-z])');
    var REX_UPPERCASE = new RegExp('(?=.*[A-Z])');
    var REX_NUMBER = new RegExp('(?=.*[0-9])');
    var REX_SPECIAL = new RegExp('(?=.[!@#\$%\^&])');
    var REX_INTERGER = new RegExp('^[0-9]*$');
    var REX_PHONE = new RegExp('^(0|84)[0-9]*$');
    var REX_EMAIL = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var REX_URL = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i);

    var _init = function () {
        // self.Block4();
    }
    var _resize = function () {}


    /**
     * Validate form
     * @param {{name,validators}[]} form
     */
    function isValidForm(form) {
        isValid = true;

        form.forEach(function (input) {
            var value = $(input.name).val();
            input.validators.forEach(function (validator) {
                switch (validator) {
                    case 'required':
                        if (value === '') {
                            isValid = false;
                        }
                        break;
                    case 'isNumber':
                        if (REX_IS_NUMBER.test(value) === false) {
                            isValid = false;
                        }
                        break;
                    case 'min':
                        if (+value < input.min) {
                            isValid = false;
                        }
                        break;
                    case 'max':
                        if (+value > input.max) {
                            isValid = false;
                        }
                        break;
                    case 'minLength':
                        if (value.length < input.minLength) {
                            isValid = false;
                        }
                        break;
                    case 'maxLength':
                        if (value.length > input.maxLength) {
                            isValid = false;
                        }
                        break;
                    case 'email':
                        if (REX_EMAIL.test(value) === false) {
                            isValid = false;
                        }
                        break;
                }
            });
        });

        return isValid;
    }

    function validateForm($submit, form) {

        function updateView() {
            $($submit).attr("disabled", !isValidForm(form));
        }

        var arrElement = [];
        form.forEach(function (element) {
            arrElement.push(element.name);
        });

        $(arrElement.join(",")).on("change keyup", function () {
            updateView();
        });
        updateView();
    }

    return {
        init: _init,
        resize: _resize
    }
});

var mainScript = new MainScript();

$(window).on("load", function () {
    mainScript.init();
    new WOW().init();
});

$(window).on("resize", function () {
    mainScript.resize();
});