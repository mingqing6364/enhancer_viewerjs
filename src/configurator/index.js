/**
 * Widget Configurator Sample
 * The input and output of the configurator is the profile of its corressponding 
 * widget.
 * @author 
 * @created
 */

require('./index.less');

const locale = require('./i18n');
const template = require('./index.html');

const configurator = {
  construct: function() {
    const tplHTML = template({
      locale: locale()
    });

    $('body').html(tplHTML);
  },

  initDataSource: function () {
    const dataSpecification = `{
      "rows": [
        { // ${locale('tip')}
          "pic_name": "pic_name1", // ${locale('contentField1')}
          "pic_url": "pic_url1", // ${locale('contentField2')}
          "big_pic_url": "big_pic_url1" // ${locale('contentField3')}
        },
        {
          "pic_name": "pic_name2",
          "pic_url": "pic_url2",
          "big_pic_url": "big_pic_url2"
        },
        ... 
      ]
    }`;
    this.dataSourceConfig = Enhancer.DatasourceManager.createConfigurator('dataSourceDom', {
      supportedTypes: ['rdb', 'http', 'static', 'jsonp'],
      dataSpecification: dataSpecification, // 组件数据格式说明 
      onSave: (source) => {
        this.profile.dataSourceId = source.id;
      }
    });

    if (this.profile.dataSourceId) {
      Enhancer.DatasourceManager.getDatasource(this.profile.dataSourceId, (source) => {
        this.dataSourceConfig.setConfig(source);
      });
    }
  },
  /**
   * @setProfile {Function} [required] Will be called when user decides to  
   * config the widget on workbench.
   * @param profile {Object} The profile of corresponding widget.
   */
  setProfile: function(profile) {
    this.profile = profile || {};
    this.initDataSource();

    for (var i in this.profile) {
      if (this.profile[i] != null) {
        if(typeof this.profile[i] === 'boolean') {
          $('input[name=' + i + ']').prop('checked', this.profile[i]);
        } else {
          $('input[name=' + i + ']').val(this.profile[i]);
        }
      }
    }
  },
  /**
   * @getProfile {Function} [required] Will be called when user click the save
   * button which is on the bottom of the configurator dialog. Note that if the
   * profile is invalid which is configurated by user, you should gave tips to
   * user and return false to prevent this save operation.
   * @return {Object} profile
   */
  getProfile: function() {
    if (!this.profile || !this.profile.dataSourceId) {
      return false;
    }

    this.profile.inline = $('input[name=inline]').prop('checked');
    this.profile.navbar = $('input[name=navbar]').prop('checked');
    this.profile.title = $('input[name=title]').prop('checked');
    this.profile.toolbar = $('input[name=toolbar]').prop('checked');
    this.profile.tooltip = $('input[name=tooltip]').prop('checked');
    this.profile.movable = $('input[name=movable]').prop('checked');
    this.profile.zoomable = $('input[name=zoomable]').prop('checked');
    this.profile.rotatable = $('input[name=rotatable]').prop('checked');
    this.profile.scalable = $('input[name=scalable]').prop('checked');
    this.profile.transition = $('input[name=transition]').prop('checked');
    this.profile.fullscreen = $('input[name=fullscreen]').prop('checked');
    this.profile.keyboard = $('input[name=keyboard]').prop('checked');
    this.profile.interval = Number($('input[name=interval]').val());
    this.profile.zoomRatio = Number($('input[name=zoomRatio]').val());
    this.profile.minZoomRatio = Number($('input[name=minZoomRatio]').val());
    this.profile.maxZoomRatio = Number($('input[name=maxZoomRatio]').val());
    this.profile.zIndex = Number($('input[name=zIndex]').val());
    this.profile.zIndexInline = Number($('input[name=zIndexInline]').val());

    return {
      dataSourceId: this.profile.dataSourceId,
      inline: this.profile.inline,
      navbar: this.profile.navbar,
      title: this.profile.title,
      toolbar: this.profile.toolbar,
      tooltip: this.profile.tooltip,
      movable: this.profile.movable,
      zoomable: this.profile.zoomable,
      rotatable: this.profile.rotatable,
      scalable: this.profile.scalable,
      transition: this.profile.transition,
      fullscreen: this.profile.fullscreen,
      keyboard: this.profile.keyboard,
      interval: this.profile.interval,
      zoomRatio: this.profile.zoomRatio,
      minZoomRatio: this.profile.minZoomRatio,
      maxZoomRatio: this.profile.maxZoomRatio,
      zIndex: this.profile.zIndex,
      zIndexInline: this.profile.zIndexInline
    };
  },
  /**
   * @getSupportedEventList {Function} [optional] This method will be called if
   * implemented when the user click the save button to gather the events which
   * will be triggered in runtime by the widget instance. Note that the supported 
   * events would be different with the different profiles configurated by user in
   * the same type widget. 
   * @param profile {Object} The profile returned by getProfile() method which will be
   *   called before this method calling.
   * @return {Array<Object>} EventList
   */
  getSupportedEventList: function(profile) {
    // TODO: Add your code here to return different event list following
    // current configurated profile.

    // Event list example
    return [{
        // Event Id [required]
        id: "exampleEvent",
        // Event Name [required] Maybe you can set it as the same as the id.
        name: "Example Event",
        // Event Description [optional]
        // Maybe a i18n is needed to describe the event in variables languages.
        des: "Example Event description"
      }
      // , ...
    ];
  },
  /**
   * @getSupportedVariableList {Function} [optional] This method will be called if
   * implemented when the user click the save button, to gather the variables owned
   * by the widget instance. Note that the supported variables would be different with 
   * the different profiles configurated by user in the same type widget.
   * @param profile {Object} The profile returned by getProfile() method which will be
   *   called before this method calling.
   * @return VariableList {Array<Object>} 
   **/
  getSupportedVariableList: function(profile) {

    // TODO: Add your code here to return different variable list following
    // current configurated profile.

    // Variable list example
    return [{
        // Variable name [required]
        name: 'exampleVar',
        // Variable type [optional default string]
        type: 'string',
        // Variable description
        des: 'example Variable description.'
      }
      // , ...
    ];
  },
  /**
   * @getDependentVariableList {Function} [optional] This method is repsonsible
   * for gathering the dependent variables of the widget from context.
   * @param profile {Object} The profile returned by getProfile() method which will be
   *   called before this method calling.
   * @return {Array<String>}
   */
  getDependentVariableList: function(profile) {
    // Variable List example
    return [
      // '1-userid',
      // '12-example-dep-var-from-other-window'
    ];
  }
};

// register configurator
Enhancer.registerWidgetConfigurator(configurator);