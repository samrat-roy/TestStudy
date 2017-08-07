import logger from '../../common/utilities/logger';

exports.logError = (err) => {
	logger.bunyanLogger.error(err);
};