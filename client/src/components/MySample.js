import { PureComponent } from 'react'
import {gql} from 'apollo-boost'
import { graphql } from 'react-apollo'
//connecting to redux store
import {connect} from 'react-redux'
//needed for multiple default export at the end of component
import {compose} from 'redux'

const getBooksQuerry = gql`
{
    category {
      name
      products {
        name
      }
    }
    }
`

class BookList extends PureComponent {
    increment = () => {
        this.props.dispatch({ type: "INCREMENT"})
    }
    decrement = () => {
        this.props.dispatch({ type: "DECREMENT"})
    }
    displayBooks(){
        const data = this.props.data

        if (data.loading) {
            return <div>Loading Books...</div>
        } else {
            return data.category.products.map(book=>{
                return <li key={book.id}>{book.name}</li>
            })
        }
    }
    render() {
        
        
        return (
            <div>
                <ul className="book-list">
                    {this.displayBooks()}
                    {this.props.count}
                </ul>
                <button onClick={this.decrement}>---</button>
                <button onClick={this.increment}>+++</button>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    count: state.count
})

//multiple Default Export
export default compose(
    connect(mapStateToProps),
    graphql(getBooksQuerry)
)(BookList)
