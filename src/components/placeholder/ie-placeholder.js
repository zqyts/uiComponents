/**
 * Created by zhouqiyuan on 2017/4/6.
 */
(function($) {

  /**
   * placeholders in browsers support ie8
   */

  // Return if native support is available.
  if ("placeholder" in document.createElement("input")) return;

  $(document).ready(function(){
    $(':input[placeholder]').not(':password').each(function() {
      setupPlaceholder($(this));
    });

    $(':password[placeholder]').each(function() {
      setupPasswords($(this));
    });

    $('form').submit(function(e) {
      clearPlaceholdersBeforeSubmit($(this));
    });
  });

  function setupPlaceholder(input) {

    var placeholderText = input.attr('placeholder');
    setPlaceholderOrFlagChanged(input, placeholderText);
    input.focus(function(e) {
      if (input.data('changed') === true) return;
      if (input.val() === placeholderText){
        input.css({
          color:"#333"
        });
        input.val('');
      }
    }).blur(function(e) {
      if (input.val() === ''){
        input.css({
          color:"#999"
      });
        input.val(placeholderText);
      }
    }).change(function(e) {
      input.data('changed', input.val() !== '');
    });
  }

  function setPlaceholderOrFlagChanged(input, text) {
    (input.val() === '') ? input.val(text) : input.data('changed', true);
  }

  function setupPasswords(input) {
    var passwordPlaceholder = createPasswordPlaceholder(input);
    input.after(passwordPlaceholder);

    (input.val() === '') ? input.hide() : passwordPlaceholder.hide();

    input.blur(function(e) {
      if (input.val() !== ''){
        input.css({
          color:"#333"
      });
        return;
      }
      input.hide();
      passwordPlaceholder.show();
    });

    $(passwordPlaceholder).focus(function(e) {
      passwordPlaceholder.hide();
      input.show().focus();
    });
  }

  function createPasswordPlaceholder(input) {
    return $('<input>').attr({
      placeholder: input.attr('placeholder'),
      value: input.attr('placeholder'),
      id: input.attr('id'),
      readonly: true
    }).addClass(input.attr('class'));
  }

  function clearPlaceholdersBeforeSubmit(form) {
    form.find(':input[placeholder]').each(function() {
      if ($(this).data('changed') === true) return;
      if ($(this).val() === $(this).attr('placeholder')) $(this).val('');
    });
  }
})(jQuery);
