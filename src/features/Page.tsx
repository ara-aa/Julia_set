import { Button, Form, FormInput, Label, Layout, Spinner } from '@/components'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { COMP_CONST, MAX_X, MAX_Y, MIN_X, MIN_Y } from '@/constants'
import { action } from './action'

const Page = () => {
  const { juliaForm, onSubmit, isLoading, png } = action()

  return (
    <Layout>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel>
          <Form {...juliaForm}>
            <form
              onSubmit={juliaForm.handleSubmit(onSubmit)}
              className='grid gap-3 ml-2'
            >
              <FormInput form={juliaForm} name='min_x' label={MIN_X} />
              <FormInput form={juliaForm} name='max_x' label={MAX_X} />
              <FormInput form={juliaForm} name='min_y' label={MIN_Y} />
              <FormInput form={juliaForm} name='max_y' label={MAX_Y} />

              <Label className='text-lg'>{COMP_CONST}</Label>
              <div className='flex items-end gap-2'>
                <FormInput
                  form={juliaForm}
                  name='comp_const_a'
                  label={`${COMP_CONST}_a`}
                />
                <p className='font-semibold'>+</p>
                <FormInput
                  form={juliaForm}
                  name='comp_const_b'
                  label={`${COMP_CONST}_b`}
                />
                <p className='font-semibold'>i</p>
              </div>

              <div className='mt-4'>
                <Button type='submit'>Submit</Button>
              </div>
            </form>
          </Form>
        </ResizablePanel>

        <ResizableHandle />

        {png && (
          <ResizablePanel className='flex justify-center'>
            {png && <img alt='ジュリア集合の描画結果画像' src={png} />}
          </ResizablePanel>
        )}

        {isLoading && <Spinner size='large' />}
      </ResizablePanelGroup>
    </Layout>
  )
}

export default Page
