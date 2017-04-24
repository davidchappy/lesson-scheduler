var FlashMessages = React.createClass({
  getInitialState() {
    return {
      messages: this.props.messages
    }
  },

  componentDidMount() {
    window.flash_messages = this;
  },

  addMessage: function(message) {
    var messages = React.addons.update(this.state.messages, { $push: [message] });
    this.setState({ messages: messages });
  },

  removeMessage: function(message) {
    var index = this.state.messages.indexOf(message);
    var messages = React.addons.update(this.state.messages, { $splice: [[index, 1]] });
    this.setState({ messages: messages });
  },

  printMessages: function(messages) {
    var prevMessage = null;
    for(var index in messages) {
      if(prevMessage) {
        this.removeMessage(prevMessage);
      }
      this.addMessage(messages[index]);
      prevMessage = messages[index];
    } 
  },
  
  render () {
    console.log("Messages from flash_messages: ", this.state.messages)
    var alerts = this.state.messages.map( message =>
      <Alert key={ message.id } message={ message }
        onClose={ () => this.removeMessage(message) } />
    );
    
    return(
      <React.addons.CSSTransitionGroup
        transitionName='alerts'
        transitionEnter={false}
        transitionLeaveTimeout={500}>
        { alerts }
      </React.addons.CSSTransitionGroup>
    );
  }
});