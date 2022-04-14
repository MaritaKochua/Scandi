// import PropTypes from 'prop-types';
import { PureComponent } from "react";

import "./ProgressBar.style";

export class ProgressBar extends PureComponent {
  state = { visibleSteps: [], currentPageIndex: 0, lastPage: false };
  static propTypes = {
    // TODO: implement prop-types
  };
  componentDidMount() {
    let steps = [...this.props.steps];
    steps.pop();
    this.setState({ visibleSteps: steps });
    const currentPgIndex = this.props.steps.findIndex(
      (step) => step === this.props.currentStep
    );
    this.setState({ currentPageIndex: currentPgIndex });
    if (currentPgIndex === this.props.steps.length - 1) {
      this.setState({ lastPage: true });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.currentStep !== prevProps.currentStep) {
      const currentPgIndex = this.props.steps.findIndex(
        (step) => step === this.props.currentStep
      );
      this.setState({ currentPageIndex: currentPgIndex });
      if (currentPgIndex === this.props.steps.length - 1) {
        this.setState({ lastPage: true });
      }
    }
  }
  render() {
    return (
      <div block="ProgressBar">
        <div className="progressLines" style={{ "--left": "2000px" }}></div>
        <div className="ProgressSteps">
          {this.state.visibleSteps.map((step, index) => {
            if (this.state.currentPageIndex === index) {
              console.log(step);
            }
            return (
              <div className={index !== 0 && "stepWithLine"}>
                {index !== 0 && (
                  <div
                    className="progressLines"
                    key={index}
                    style={
                      this.state.currentPageIndex > index
                        ? { "--left": "2000px" }
                        : this.state.currentPageIndex === index
                        ? { "--animation": "mymove 2s" }
                        : null
                    }
                  ></div>
                )}
                <div className="singleStep">
                  <p>{index + 1}</p>
                  <span>{step}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="progressLines"
          style={this.state.lastPage ? { "--animation": "mymove 2s" } : null}
        ></div>
      </div>
    );
  }
}

export default ProgressBar;
