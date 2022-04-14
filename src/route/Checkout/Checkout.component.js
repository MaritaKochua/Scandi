import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import { ContentWrapper } from "@scandipwa/scandipwa/src/component/ContentWrapper/ContentWrapper.component.js";
import ProgressBar from "Component/ProgressBar";
import "./Checkout.override.style.scss";

export class Checkout extends SourceCheckout {
  returnSteps() {
    let steps = [];
    for (const [key, value] of Object.entries(this.stepMap)) {
      steps.push(value.title.replace("step", ""));
    }
    return steps;
  }
  returnCurrentStep() {
    let currentTitle = () => {
      for (const [key, value] of Object.entries(this.stepMap)) {
        if (key === this.props.checkoutStep) {
          return value.title.replace("step", "");
        }
      }
    };
    return currentTitle();
  }
  render() {
    return (
      <main block="Checkout">
        <ProgressBar
          steps={this.returnSteps()}
          currentStep={this.returnCurrentStep()}
        />
        <ContentWrapper
          wrapperMix={{ block: "Checkout", elem: "Wrapper" }}
          label={__("Checkout page")}
        >
          {this.renderSummary(true)}
          <div block="Checkout" elem="Step">
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }
}
export default Checkout;
