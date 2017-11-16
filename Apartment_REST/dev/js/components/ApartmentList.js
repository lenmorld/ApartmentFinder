import React, {Component} from 'react';
import Apartment from './Apartment';

class ApartmentList extends Component {

  constructor(props) {
    console.log(props);
    super(props);
  }

  componentDidMount() {
    this.props.actions.getAll();
  }

  render() {

      console.log("props:", this.props);

    const apartments = this.props.apartments.map((apt) =>
      <Apartment key="{apt.apt_id}" title={apt.price} />
    );


    return (
      <div>
        <ul>
            {apartments}
        </ul>
      </div>
    );
  }
}


export default ApartmentList;
