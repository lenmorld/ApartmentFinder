import React, {Component} from 'react';
import {connect} from 'react-redux';


class Apartment extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return(
        <li>{ this.props.title }</li>
    );

    // if (!this.props.apartment.apt_id) {
    //   return (<h4>Select an apartment...</h4>)
    // }
    // return (
    //   <div>
    //     {/*<img src={this.props.apartment.thumbnail}/>*/}
    //     {/*<h2>{this.props.apartment.first}*/}
    //         {/*{this.props.apartment.last}*/}
    //     {/*</h2>*/}
    //     {/*<h3>*/}
    //       {/*{this.props.apartment.age}*/}
    //     {/*</h3>*/}
    //     <h3>
    //       {this.props.apartment.apt_id}
    //     </h3>
    //   </div>
    // );
  }

}


export default Apartment;

// // maps a piece of state (in store) to component as props
// function mapStateToProps(state) {
//   return {
//     user: state.activeApartment
//   };
// }
//
//
// // connect redux state to the component props
// // we return a "smart component" (container)
// // by combining state with UserDetail (dumb component)
// export default connect(mapStateToProps)(ApartmentDetail);
