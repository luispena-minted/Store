import { phonesAccesories, phonesItems } from "./../api endpoint/Constants";
import { fetchItems } from "./../actions/index";
import { connect } from "react-redux";
import React, { Component } from "react";
import SingleProduct from "../components/SingleProduct";
import Header from "./Header";
class ProductDetails extends Component {
  componentDidMount() {
    const { activePhone, fetchItems } = this.props;
    if (activePhone.length === 0) {
      fetchItems(phonesItems);
      fetchItems(phonesAccesories);
    }
  }
  render() {
    const { PhoneId } = this.props.match.params;
    const { activePhone } = this.props;
    const product = activePhone.find(c => c.sku === PhoneId);
    const loadingProduct = <div> Loading </div>;
    return (
      <div>
        <Header />
        {!product && loadingProduct}
        {product && (
          <SingleProduct
            path={this.props.match.params.PhoneId}
            product={product}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ phones, cart }) => {
  return {
    activePhone: phones,
    cart
  };
};

export default connect(
  mapStateToProps,
  { fetchItems }
)(ProductDetails);
