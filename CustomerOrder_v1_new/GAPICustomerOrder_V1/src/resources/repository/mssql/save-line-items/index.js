import pool from '../common/pool';
import sql from 'mssql';
const poolName = 'LegacySecureDBPool';
const spSaveLineItems = '[contract].[CentralLineItemSave]';

function saveLineItems(orderNo, storeId, baseProductId, quantity, orderUnit, pickerNotes, substitutionRule, isUpdateOrder, orderItems, orderLines, linePrice, subsNote ) {
	return new Promise((resolve, reject) => {
		pool.getPool(poolName).then(connectionPool => {
			let request = new sql.Request(connectionPool);
			request.input('OrderNo', sql.Int, orderNo);
			request.input('BranchNo', sql.Numeric, storeId);
			request.input('ProductId', sql.Int, baseProductId);
			request.input('Quantity', sql.Numeric, quantity);
			request.input('OrderUnit', sql.TinyInt, orderUnit);
			request.input('Comments', sql.VarChar, pickerNotes);
			request.input('SubstitutionRule', sql.Char, substitutionRule);
			request.input('UpdateOrder', sql.Bit, isUpdateOrder);
			request.input('OrderItems', sql.Int, orderItems);
			request.input('OrderLines', sql.Int, orderLines);
			request.input('LinePrice', sql.SmallMoney, linePrice);
			request.input('SubsNote', sql.VarChar, subsNote);
			request.execute(spSaveLineItems).then(() => {
				resolve();
			}).catch(err => reject(err));
		}).catch(err => reject(err));
	});
}

export default saveLineItems;
