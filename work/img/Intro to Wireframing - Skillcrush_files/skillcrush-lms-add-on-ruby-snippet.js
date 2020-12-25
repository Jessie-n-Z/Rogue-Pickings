/**
 Ruby Snippet Code Editor
 **/
(function($) {
  'use strict';

  $(function() {
    // updates the hidden quiz question with the Ruby tab contents
    function updateCodePreviewRubySnippet() {
      var code = rubySnippetEditor.getValue();
      $('.wpcw_fe_quiz_q_single_0 textarea').text(code);
      $('#js-run, .wpcw_fe_quiz_submit input[name=submit]').removeAttr('disabled');
      const submitButton = document.querySelector('[data-action-lesson-submit]');
      if (submitButton) {
        submitButton.classList.toggle('sc-submit-disabled', code.length == 0);
      }
    }

    // initialize CodeMirror for the editor, if the necessary textarea exists
    if ($('textarea#sclmsaddon-ruby-code').length > 0) {
      var rubySnippetEditor = CodeMirror.fromTextArea(document.getElementById('sclmsaddon-ruby-code'), {
        mode: 'text/x-ruby',
        indentUnit: 4,
        indentWithTabs: true,
        lineNumbers: true,
        lineWrapping: true,
        readOnly: false,
        autofocus: true,
      });

      // this takes care of populating the quiz question with the contents after initialization
      setTimeout(updateCodePreviewRubySnippet, 300);

      // update on change!
      rubySnippetEditor.on('change', updateCodePreviewRubySnippet);

      // load either user's saved Ruby or starter Ruby
      var data = {
        action: sclmsaddon_editor_js_consts.ruby_challenge_code_value_action,
        id: $('.sclmsaddon_lesson_challenge_form').attr('id'),
        sclmsaddon_progress_nonce: sclmsaddon_editor_js_consts.sclmsaddon_progress_nonce,
      };

      $.post(sclmsaddon_editor_js_consts.ajaxurl, data, function(response, status) {
        // the response object that has messages & data in it
        var responseObj = $.parseJSON(response);

        if (responseObj.hasOwnProperty('success')) {
          if (responseObj.success.hasOwnProperty('data')) {
            // if we have JS code, update the JS tab with it
            if (responseObj.success.data.hasOwnProperty('ruby')) {
              if (responseObj.success.data.ruby !== null) {
                rubySnippetEditor.setValue(responseObj.success.data.ruby);
              }
              rubySnippetEditor.refresh();
            }
          }
        }
      });
    }
  });
})(jQuery);
