import React from 'react';

class ProductPage extends React.Component {
    render(){
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2"/>
                        <div className="col-sm-8">  
                        <h1 className="text-center">Product</h1>
                            <h5> At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                                </h5>
                                <h4><a href="http://google.com">candidates page</a></h4>    
                            </div>
                        <div className="col-sm-2"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductPage;