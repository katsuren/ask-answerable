var Bootstrap = {
    authToken: "",
    getAuthenticityToken: function() {
        this.authToken = $("input[name='authenticity_token']").val();
    },

    addAnswerBoxListener: function() {
        $(".container-wide").on("click", ".answer-linkBox a[href$='reply']", function(e) {
            var container = $(this).closest(".questionBox");
            // すでに回答ボックスがある場合はリンク先に飛ぶ
            if ( ! container.hasClass("alreadyAdded")) {
                Bootstrap.addAnswerBoxContainer(container);
                container.addClass("alreadyAdded");
                return false;
            }
        });

        $(".container-wide").on("keydown", ".questionBox textarea", function(e) {
            // Ctrl + Enter
            if ((e.ctrlKey || e.metaKey) && e.keyCode == 13) {
                var form = $(this).closest("form");
                form.submit();
            }
        });

        $(".container-wide").on("submit", ".questionBox form", function(e) {
            e.preventDefault();
            var that = $(this);
            var params = that.serialize();
            var action = that.prop("action");
            $.ajax({
                type: "POST",
                url: action,
                data: params,
                dataType: "text",
                complete: function(status) {
                    var parent = that.closest(".questionBox");
                    parent.fadeOut(200);
                }
            });
            return false;
        });
    },

    addAnswerBoxContainer: function(container) {
        var askId = this.getAskId(container);
        var formId = "form_" + askId;
        var form = $("<form>", {id: formId, class: "customForm", method: "post", action: "/questions/" + askId + "/answer", disabled: "disabled"});
        form.append('<input type="hidden" name="_method" value="put">');
        form.append('<input type="hidden" name="authenticity_token" value="' + Bootstrap.authToken + '">');
        form.append('<div id="postLoaderTerritory"><textarea class="growable-textarea" cols="0" id="post-input-pre" name="question[answer_text]" rows="0" style="overflow: hidden; line-height: 18px; height: 54px;"></textarea></div>');

        var postOptionsBorder = $("<div>", {id: "post_options-border"});
        var postOptions = $("<div>", {id: "post_options"});
        postOptions.append('<input class="submitBlue submit-button-active" id="question_submit" name="commit" type="submit" value="回答">');
        var twitter = '<label for="question_submit_twitter">';
        twitter += '<div class="shareService"><b>Twitter</b></div>';
        twitter += '<input name="question[submit_twitter]" type="hidden" value="0">';
        twitter += '<input autocomplete="off" checked="checked" class="shareCheckbox" id="question_submit_twitter" name="question[submit_twitter]" type="checkbox" value="1">';
        twitter += '</label>';
        postOptions.append(twitter);
        var fb = '<label for="question_submit_facebook">';
        fb += '<div class="shareService"><b>Facebook</b></div>';
        fb += '<input name="question[submit_facebook]" type="hidden" value="0">';
        fb += '<input autocomplete="off" class="shareCheckbox" id="question_submit_facebook" name="question[submit_facebook]" type="checkbox" value="1">';
        fb += '</label>';
        postOptions.append(fb);
        var vk = '<label for="question_submit_vkontakte">';
        vk += '<div class="shareService"><b>Vk.com</b></div>';
        vk += '<input name="question[submit_vkontakte]" type="hidden" value="0">';
        vk += '<input autocomplete="off" class="shareCheckbox" id="question_submit_vkontakte" name="question[submit_vkontakte]" type="checkbox" value="1">';
        vk += '</label>';
        postOptions.append(vk);
        postOptionsBorder.append(postOptions);

        form.append(postOptionsBorder);
        container.append(form);
    },

    getAskId: function(questionBox) {
        return questionBox.prop('id').replace("inbox_question_", "");
    }
}

Bootstrap.getAuthenticityToken();
Bootstrap.addAnswerBoxListener();
