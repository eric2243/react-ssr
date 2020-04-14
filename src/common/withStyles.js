
import React, {Component} from 'react'
export default style => {

    return OldComponent => {

        class NewComponent extends Component{

            componentWillMount(){
                if(this.props.staticContext){
                    this.props.staticContext.insertCss(style);
                }
            }
            render() {
                return (
                    <OldComponent {...this.props} />
                );
            }

        }

        return NewComponent;
    }
}