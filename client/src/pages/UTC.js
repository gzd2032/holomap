import { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        display: 'flex',
        flexDirection: 'column',
      },
    },
  }));

export default function UTC({
  onSubmit,
  initialValues,
}) {
  const formRef = useRef();

  const title = initialValues
    ? 'Edit Existing Unit Type Code'
    : 'Create New Unit Type Code';

  if (initialValues && formRef.current) {
    formRef.current['unitTypeCode'].value = initialValues.unit_type_code;
    formRef.current['category'].value = initialValues.category;
    formRef.current['nomenclature'].value = initialValues.nomenclature;
    formRef.current['description'].value = initialValues.description;
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { current } = formRef;
    onSubmit({
      unit_type_code:  current["unitTypeCode"].value,
      category: current["category"].value,
      nomenclature: current["nomenclature"].value,
      description: current["description"].value,
    });
  };

  const classes = useStyles();
  return (
    <div>
        <article>
          <h1>{title}</h1>
          <form ref={formRef} className={classes.root} noValidate autoComplete="off">
              <TextField
              id="outlined-basic"
              name="unitTypeCode"
              label="Unit Type Code"
              variant="outlined"
              required
              />
              <TextField
              id="outlined-basic"
              name="category"
              label="Category"
              variant="outlined"
              required
              />
              <TextField
              id="outlined-basic"
              name="nomenclature"
              label="Nomenclature"
              variant="outlined"
              required
              />
              <TextField
              id="outlined-basic"
              name="description"
              label="Description"
              variant="outlined"
              required
              />
              <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
          </form>
        </article>
    </div>
  )
}
