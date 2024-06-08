import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Alert({ className = '', type = 'info', icon = faCircleInfo, children, ...props }) {
  const getAlertCssClasses = () => {
    let cssClasses = '';

    switch (type) {
      case 'info':
        cssClasses = 'bg-blue-100 text-blue-800';
        break;
      case 'warning':
        cssClasses = 'bg-yellow-100 text-yellow-800';
        break;
      case 'danger':
        cssClasses = 'bg-red-100 text-red-800';
        break;
      default:
        cssClasses = 'bg-blue-100 text-blue-800';
        break;
    }

    return cssClasses;
  };

  return (
    <div
      className={`flex items-center rounded-lg p-4 text-sm ${getAlertCssClasses()} ${className}`}
      role="alert"
      {...props}
    >
      <FontAwesomeIcon className="me-3 inline h-4 w-4 flex-shrink-0" icon={icon} />
      {children}
    </div>
  );
}
