import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange ,clearFilters} from '../features/allJobs/allJobsSlice';


const SearchContainer = () => {
  const {isLoading,search,searchStatus,searchType,sort,sortOptions}=useSelector(store=>store.allJobs)

  const {jobTypeOptions,statusOptions}=useSelector(store=>store.job)
  const dispatch=useDispatch()
  const handleSearch=(e)=>{
    if(isLoading){
   const name=e.target.name
   const value=e.target.value
dispatch(handleChange({name,value}))
return
    }
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(clearFilters( ))
  }
  return <Wrapper>
    <form  className="form">
      <h4>Search Form</h4>
      <div className="form-center">
        <FormRow type='text' name='search' value={search} handleChange={handleSearch}/>

        <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} handleChange={handleSearch} list={['all',...statusOptions]} />

         <FormRowSelect labelText='type' name='searchType' value={searchType} handleChange={handleSearch} list={['all',...jobTypeOptions]} />

          <FormRowSelect name='sort' value={sort} handleChange={handleSearch} list={sortOptions} />
          <button  className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}> Clear Filters</button>
      </div>
    </form>
  </Wrapper>
}

export default SearchContainer