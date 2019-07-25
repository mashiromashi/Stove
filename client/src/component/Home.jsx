import React from 'react';
import Header from './Header';
import Content from './Content';

export default class Home extends React.Component{
    render(){
        return(
            <div>
                <Header/>
                    <div className="content">
                        <Content userdata={this.props.userdata}/>
                    </div>
            </div>
        )
    }
}