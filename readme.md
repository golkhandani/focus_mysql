## Create Trigger in MySQL

```sql
CREATE TRIGGER trigger_name
{BEFORE | AFTER} {INSERT | UPDATE| DELETE }
ON table_name FOR EACH ROW
trigger_body;
```
> If you want to execute multiple statements, you use the BEGIN END compound statement.

An usecase for triggers could be something like validations
For example:
```sql
DELIMITER $$
CREATE TRIGGER before_billing_update
    BEFORE UPDATE 
    ON billings FOR EACH ROW
BEGIN
    IF new.amount > old.amount * 10 THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'New amount cannot be 10 times greater than the current amount.';
    END IF;
END$$    
DELIMITER ;
```
The trigger activates before any update. If the new amount is 10 times greater than the current amount, the trigger raises an error.


## Working with MySQL Scheduled Event
`SHOW PROCESSLIST;` To Get all the events in whole dbs.
`SET GLOBAL event_scheduler = ON;` To Enable Event Scheduler.



```sql
CREATE EVENT [IF NOT EXIST] event_name
ON SCHEDULE schedule
DO
event_body
```

schedule could be on of :
- `AT timestamp [+ INTERVAL]`
- `EVERY interval STARTS timestamp [+INTERVAL] ENDS timestamp [+INTERVAL]`

*** Interval format is: `INTERVAL expr unit` *** 
> look at https://www.mysqltutorial.org/mysql-interval

`DROP EVENT [IF EXIST] event_name;` To Remove an event.
