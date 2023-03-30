# Plamen-Petrov-employees
Sirma Solutions second round contest

Please use the two dedicated CSV files to test the code initially.
If you are saving your own CSV input in Excel, please make sure that the cell formatting has been set to "Text".
The accepted date formats are YYYY-MM-DD, YYYY.MM.DD or YYYY/MM/DD. Each entry should be on a new line.
----------------------------------
TASK:
Pair of employees who have worked together

Create an application that identifies the pair of employees who have worked
together on common projects for the longest period of time.

Input data:
 A CSV file with data in the following format:
 EmpID, ProjectID, DateFrom, DateTo
 
Sample data:
143, 12, 2013-11-01, 2014-01-05
218, 10, 2012-05-16, NULL
143, 10, 2009-01-01, 2011-04-27
...

Sample output:
 143, 218, 8
 
 Specific requirements
1) DateTo can be NULL, equivalent to today
2) The input data must be loaded to the program from a CSV file
3) Create an UI:
The user picks up a file from the file system and, after selecting it, all common
projects of the pair are displayed in datagrid with the following columns:
Employee ID #1, Employee ID #2, Project ID, Days worked
