/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {

  Drupal.shippingRecalculate = {
    recalculateButtonSelector: '',
    submitButtonSelector: '[id^=edit-actions-next]',
    wrapper: '',
    onChange: function onChange(element) {
      var waitForAjaxComplete = function waitForAjaxComplete(element) {
        setTimeout(function () {
          if (element.is(':disabled')) {
            waitForAjaxComplete(element);
            return;
          }
          if (Drupal.shippingRecalculate.canRecalculateRates()) {
            Drupal.shippingRecalculate.recalculateRates();
          }
        }, 100, element);
      };

      waitForAjaxComplete(element);
    },
    init: function init(context) {
      var _this = this;

      $(this.wrapper).find(':input.required', context).once('shipping-recalculate').on('change', function (_ref) {
        var currentTarget = _ref.currentTarget;

        _this.onChange($(currentTarget));
      });
    },
    canRecalculateRates: function canRecalculateRates() {
      var canRecalculate = true;
      $(this.wrapper).find(':input.required').each(function (index, element) {
        if (!$(element).val()) {
          canRecalculate = false;
          return false;
        }
      });

      return canRecalculate;
    },
    recalculateRates: function recalculateRates() {
      if ($(this.submitButtonSelector).length) {
        $(this.submitButtonSelector).prop('disabled', true);
      }
      $(this.wrapper).find(this.recalculateButtonSelector).trigger('mousedown');
    }
  };

  Drupal.behaviors.shippingRatesRecalculate = {
    attach: function attach(context) {
      Drupal.shippingRecalculate.wrapper = drupalSettings.commerceShipping.wrapper;
      Drupal.shippingRecalculate.recalculateButtonSelector = drupalSettings.commerceShipping.recalculateButtonSelector;
      Drupal.shippingRecalculate.init(context);
    }
  };
})(jQuery, Drupal, drupalSettings);