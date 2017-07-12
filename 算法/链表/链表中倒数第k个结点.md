#### 问题：

输入一个链表，输出该链表中倒数第 k 个结点。为了符合大多输入的习惯，本题从 1 开始计数，即链表的尾节点是倒数第一个结点。例如一个链表有六个结点，从头结点开始他们的值 依次是 1，2,3,4,5,6 这个链表的倒数第三个结点是值为4的结点。

#### 思路：

为了实现只遍历链表一次就能找到倒数第 k 个结点，我们可以定义两个指针。第一个指针从链表的头指针开始遍历向前走 k-1，第二个指针保持不动；从第 k 步开始，第二个指针也开始从链表的头指针开始遍历。由于两个指针的距离保持在 k-1，当地一个指针到达链表的尾节点时，第二个指针正好是倒数第 k 个结点。

#### 鲁棒性

```c
ListNode * FindKthToTail(ListNode * pListHead , unsigned int k)
{
	if(pListHead == NULL || k == 0)
		return NULL;

	ListNode * pAhead = pListHead;
	ListNode * pBehind = NULL;

	for(unsigned int i=0; i<k-1; i++)
	{
		if(pAhead->m_pNext != NULL)
			pAhead = pAhead->m_pNext;
		else
		{
			return NULL;
		}
	}
		


	pBehind = pListHead;

	while(pAhead->m_pNext != NULL)
	{
		pAhead = pAhead->m_pNext;
		pBehind = pBehind->m_pNext;
	}

	return pBehind;
}

ListNode * FindKthToTail(ListNode * pListHead , unsigned int k)
{
	ListNode * pAhead = pListHead;
	ListNode * pBehind = NULL;

	for(unsigned int i=0; i<k-1; i++)
			pAhead = pAhead->m_pNext;

	pBehind = pListHead;

	while(pAhead->m_pNext != NULL)
	{
		pAhead = pAhead->m_pNext;
		pBehind = pBehind->m_pNext;
	}

	return pBehind;
}
```

以上的代码，面试官可以找出三种方法让这段代码崩溃

>1.输入的 pListHead 为空指针。由于代码会视图访问空指针所指向的内存，程序崩溃。

>2.输入以 pListHead 为头结点的链表的结点总数小于 k，由于在 for 循环中会在链表上向前走 k-1 步，仍然会由于空指针造成程序崩溃

>3.输入的参数k为0.由于k是一个无符号整数，那么在 for 循环中 k-1 得到的将不是 -1，而是 4294967295 ，因此 for 循环执行的次数，远远超出我们的预计，仍然会由于空指针造成程序崩溃

#### 代码：

```c
#include <stdio.h>
#include <stdlib.h>

struct ListNode 
{
	int m_nValue;
	ListNode * m_pNext;
}

ListNode * FindKthToTail(ListNode * pListHead , unsigned int k)
{
	if(pListHead == NULL || k == 0)
		return NULL;

	ListNode * pAhead = pListHead;
	ListNode * pBehind = NULL;

	for(unsigned int i=0; i<k-1; i++)
	{
		if(pAhead->m_pNext != NULL)
			pAhead = pAhead->m_pNext;
		else
		{
			return NULL;
		}
	}
		


	pBehind = pListHead;

	while(pAhead->m_pNext != NULL)
	{
		pAhead = pAhead->m_pNext;
		pBehind = pBehind->m_pNext;
	}

	return pBehind;
}

// ====================测试代码====================
// 测试要找的结点在链表中间
void Test1()
{
    printf("=====Test1 starts:=====\n");
    ListNode* pNode1 = CreateListNode(1);
    ListNode* pNode2 = CreateListNode(2);
    ListNode* pNode3 = CreateListNode(3);
    ListNode* pNode4 = CreateListNode(4);
    ListNode* pNode5 = CreateListNode(5);

    ConnectListNodes(pNode1, pNode2);
    ConnectListNodes(pNode2, pNode3);
    ConnectListNodes(pNode3, pNode4);
    ConnectListNodes(pNode4, pNode5);

    printf("expected result: 4.\n");
    ListNode* pNode = FindKthToTail(pNode1, 2);
    PrintListNode(pNode);

    DestroyList(pNode1);
}

// 测试要找的结点是链表的尾结点
void Test2()
{
    printf("=====Test2 starts:=====\n");
    ListNode* pNode1 = CreateListNode(1);
    ListNode* pNode2 = CreateListNode(2);
    ListNode* pNode3 = CreateListNode(3);
    ListNode* pNode4 = CreateListNode(4);
    ListNode* pNode5 = CreateListNode(5);

    ConnectListNodes(pNode1, pNode2);
    ConnectListNodes(pNode2, pNode3);
    ConnectListNodes(pNode3, pNode4);
    ConnectListNodes(pNode4, pNode5);

    printf("expected result: 5.\n");
    ListNode* pNode = FindKthToTail(pNode1, 1);
    PrintListNode(pNode);

    DestroyList(pNode1);
}

// 测试要找的结点是链表的头结点
void Test3()
{
    printf("=====Test3 starts:=====\n");
    ListNode* pNode1 = CreateListNode(1);
    ListNode* pNode2 = CreateListNode(2);
    ListNode* pNode3 = CreateListNode(3);
    ListNode* pNode4 = CreateListNode(4);
    ListNode* pNode5 = CreateListNode(5);

    ConnectListNodes(pNode1, pNode2);
    ConnectListNodes(pNode2, pNode3);
    ConnectListNodes(pNode3, pNode4);
    ConnectListNodes(pNode4, pNode5);

    printf("expected result: 1.\n");
    ListNode* pNode = FindKthToTail(pNode1, 5);
    PrintListNode(pNode);

    DestroyList(pNode1);
}

// 测试空链表
void Test4()
{
    printf("=====Test4 starts:=====\n");
    printf("expected result: NULL.\n");
    ListNode* pNode = FindKthToTail(NULL, 100);
    PrintListNode(pNode);
}

// 测试输入的第二个参数大于链表的结点总数
void Test5()
{
    printf("=====Test5 starts:=====\n");
    ListNode* pNode1 = CreateListNode(1);
    ListNode* pNode2 = CreateListNode(2);
    ListNode* pNode3 = CreateListNode(3);
    ListNode* pNode4 = CreateListNode(4);
    ListNode* pNode5 = CreateListNode(5);

    ConnectListNodes(pNode1, pNode2);
    ConnectListNodes(pNode2, pNode3);
    ConnectListNodes(pNode3, pNode4);
    ConnectListNodes(pNode4, pNode5);

    printf("expected result: NULL.\n");
    ListNode* pNode = FindKthToTail(pNode1, 6);
    PrintListNode(pNode);

    DestroyList(pNode1);
}

// 测试输入的第二个参数为0
void Test6()
{
    printf("=====Test6 starts:=====\n");
    ListNode* pNode1 = CreateListNode(1);
    ListNode* pNode2 = CreateListNode(2);
    ListNode* pNode3 = CreateListNode(3);
    ListNode* pNode4 = CreateListNode(4);
    ListNode* pNode5 = CreateListNode(5);

    ConnectListNodes(pNode1, pNode2);
    ConnectListNodes(pNode2, pNode3);
    ConnectListNodes(pNode3, pNode4);
    ConnectListNodes(pNode4, pNode5);

    printf("expected result: NULL.\n");
    ListNode* pNode = FindKthToTail(pNode1, 0);
    PrintListNode(pNode);

    DestroyList(pNode1);
}

int main( )
{
    Test1();
    Test2();
    Test3();
    Test4();
    Test5();
    Test6();

    return 0;
}
```

#### 相关题目

**求链表的中间节点。**如果链表中节点总数为奇数，返回中间节点；如果节点总数是偶数，可以返回中间两个节点的任意一个。为了解决这个问题，我们也可以定义两个指针，同时从链表的头结点出发，一个指针一次走一步，另一个指针一次走两步。当走的快的指针走到链表的末尾时，走的慢的指指针正好在链表的中间。

**判断一个单向链表是否形成了环形结构。**和前面的问题一样，定义两个指针，同时从链表的头结点出发，一个指针一次走一步，另一个指针一次走两步。如果走的快的指针赶上了走的慢的指针，那么链表就是环形链表，如果走的快的指针走到了链表的末尾都没有追上第一个指针，那么链表就不是环形链表。

#### 举一反三

当我们用一个指针遍历链表不能解决问题的时候，可以尝试用两个指针来遍历链表。可以让其中一个指针遍历的速度快一些，或者让他先在链表上走若干步。
