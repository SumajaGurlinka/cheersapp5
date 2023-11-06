import { IconButton, Tooltip } from '@mui/material';
import { Edit, Add, QuestionAnswer, Search, Wc, ArrowBack, Delete, PeopleAlt } from '@mui/icons-material';

const CustomizedIconButton = ({ onClick, labelText, iconType, className }) => {
    return (
        <Tooltip title={labelText}>
            <IconButton className={className} 
            sx={{            
            color: '#2E2C32!important',
            '&:hover': {
                color: '#8B5CF6!important',
            }}} 
            aria-label={labelText} onClick={onClick} size="large">
                {renderSvgIcon(iconType)}
            </IconButton>
        </Tooltip>
    );
};

const renderSvgIcon = (iconType) => {
    switch (iconType) {
        case "Search":
            return <Search />
        case "Add":
            return <Add />
        case "QuestionAnswer":
            return <QuestionAnswer />
        case "Edit":
            return <Edit />
        case "Wc":
            return <Wc />;
        case "ArrowBack":
            return <ArrowBack />;
        case "Remove":
            return <Delete />;
        case "PeopleAlt":
            return <PeopleAlt />;
        default:
            return null;
    }
};


export default CustomizedIconButton;