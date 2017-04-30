var Alert = React.createClass({
  componentDidMount: function() {
    this.timer = setTimeout(
      this.props.onClose,
      this.props.timeout
    );
  },

  componentWillUnmount: function() {
    clearTimeout(this.timer);
  },

  alertClass: function(type) {
    var classes = {
      error: 'alert-danger',
      alert: 'alert-warning',
      notice: 'alert-info',
      success: 'alert-success'
    };
    return classes[type] || classes.success;
  },

  render: function() {
    var message = this.props.message;
    var alertClassName = `alert ${ this.alertClass(message.type) }`;
    
    return(
      <div className={ alertClassName }>
        <button className='close'
          onClick={ this.props.onClose }>
          &times;
        </button>
        { message.text }
      </div>
    );
  },

  propTypes: {
    onClose: React.PropTypes.func,
    timeout: React.PropTypes.number,
    message: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      timeout: 5000
    }; 
  },

});