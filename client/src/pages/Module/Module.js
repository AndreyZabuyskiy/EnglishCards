import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchModuleBy } from "../../redux/actions";

export const Module = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchModuleBy(id));
  }, []);

  const module = useSelector(state => {
    const { moduleReducer } = state;
    return moduleReducer.module;
  });
  
  return (
    <div>
      module id component
    </div>
  )
}