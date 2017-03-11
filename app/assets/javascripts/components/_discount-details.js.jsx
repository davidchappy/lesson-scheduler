// var DiscountDetails = React.createClass({
//   render() {
//     var studentDiscounts = this.props.studentDiscounts.map((student) => {
//       return (
//         <li>{student.name}: {Pricer.monetize(student.discount)}</li>
//       )
//     };

//     var studentDiscountList = function() {
//       return (
//         <ul>
//           {studentDiscounts}
//         <ul>  
//       )
//     };

//     return(
//       <div className='discount-details'>
//         <h4>Discount Details (n students)</h4>
//         <div className='discount-lesson-rate'>
//           <h5>30min lesson rate discount: $00</h5>
//           <p><em>Rate is $20 for 1st student, $18 for 2nd, $16 for 3 or more</em></p>
//         </div>
//         <div className='discount-quantity'>
//           <h5>Quantity discount: $00</h5>
//           <p><em>Additional $5 off for each student over 1</em></p>
//         </div>
//         <div className='discount-per-student'>
//           <h5>Per student discount: $00</h5>
//           <p><em>Rate is $20 for 1st student, $18 for 2nd, $16 for 3 or more</em></p>
//           {studentDiscountList}
//         </div>
//       </div>
//     )
//   }

// })