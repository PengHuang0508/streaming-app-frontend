import { makeStyles } from '@material-ui/core/styles';

const formStyles = makeStyles((theme) => ({
  registerPaper: {
    padding: theme.spacing(5, 4, 7),
  },
  registerTitle: {
    margin: theme.spacing(2, 0, 3),

    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.primary[2],
  },
  submitButton: {
    margin: theme.spacing(2, 0),
  },
  registerFootnote: {
    textAlign: 'right',
  },
  generalError: {
    color: 'red',
  },
}));

export default formStyles;
