var Header = React.createClass({
  getInitialState() {
    return { family: undefined, totalDiscount: 0, totalOwed: 0, possibleDiscount: 0 }
  },
  componentDidMount() {
    $.ajax({
      url: '/api/v1/families.json', 
      type: 'GET',
      success: (response) => { 
        this.setState({ family: response });
        console.log(this.state.family);
        this.calculateDiscount(); 
      }
    });
  },
  calculateDiscount() {
    var week_count = Number(this.state.family.week_count);
    var form_count = Number(this.state.family.form_count);
    var total_owed = Number(this.state.family.total_owed);
    var original_total = form_count * 80;
    var discount = 0;
    discount += (form_count-1) * 20;
    discount += week_count * 1;

    this.setState({
      totalDiscount: discount,
      totalOwed: original_total - discount,
      possibleDiscount: form_count * 13
    })

  },
  render() {
    if ( !this.state.family ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    var family = this.state.family;
    var total = this.state.totalOwed;
    var totalDiscount = this.state.totalDiscount;
    var possibleDiscount = this.state.possibleDiscount;

    return (
      <div>
        <h1>The {family.last_name} Family</h1>
        <p>Total: {total} </p>
        <p>Discount: {totalDiscount} </p>
        <p>Possible Discount: {possibleDiscount} </p>
      </div>
    )
  }
});